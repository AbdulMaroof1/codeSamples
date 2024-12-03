<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Pagination;
use App\Models\Variant;
use App\Models\Product;
use App\Models\Store;
use App\Models\Inventory;
use App\Models\Automation;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    private $store;
    private $client_id;
    private $client_secret;
    private $shopify_domain;
    //
    public function __construct()
    {
        $this->middleware('auth');
        $this->store = Store::first();

        // assign values
        $this->client_id = isset($this->store)?$this->store->client_id:'';
        $this->client_secret = isset($this->store)?$this->store->client_secret:'';
        $this->shopify_domain = isset($this->store)?$this->store->shopify_domain:'';
        
    }

    // shopify api calls

    private function createBaseProduct($productJson)
    {
        $data = [
            "product" => [
                "title" => $productJson->productName,
                "vendor" => "Amrod",
                "body_html" => $productJson->description,
                "product_type" => "simple",
                "handle" => $productJson->fullCode
                
            ]
        ];
        // Make a POST request to create base product
        $base =  $this->makeShopifyRequest("POST", "/admin/api/2021-01/products.json", $data);
        return $base;
    }

    private function storeImages($images, $productId)
    {
        $imageIds = [];
        // echo "<pre>";
        // print_r($images);
        // echo "</pre>";
        // exit;
        foreach ($images as $image) {
            // Make a POST request to add image to product
            $newImage = array(
                'image' => $image
            );
            // echo "<pre>";
            // print_r($newImage);
            // echo "</pre>";
            $imageResponse = $this->makeShopifyRequest("POST", "/admin/api/2021-01/products/{$productId}/images.json", $newImage);
    
            // Check if image upload was successful
            if (isset($imageResponse['image']['id'])) {
                $imageIds[] = $imageResponse['image']['id'];
            }

        }


        return $imageIds;
    }
    private function updateInventory($productId, $variantId, $inventoryQuantity)
    {
         $variantUrl = "/admin/api/2021-01/products/{$productId}/variants/{$variantId}.json";
         $variantResponse = $this->makeShopifyRequest("GET", $variantUrl,[]);
         if (isset($variantResponse['variant'])) {
            $variantData = $variantResponse;
            $inventoryItemId = $variantData['variant']['inventory_item_id'];
            $oldInventory = $variantData['variant']['inventory_quantity'];

            $inventoryUrlAdjust = "/admin/api/2021-01/inventory_levels/adjust.json";

            // Remove old inventory
            $payloadRemoveInventory = [
                "inventory_item_id" => $inventoryItemId,
                "location_id" => 92170846490,
                "available_adjustment" => -$oldInventory
            ];
            $this->makeShopifyRequest("POST", $inventoryUrlAdjust, $payloadRemoveInventory);

            // Add new inventory
            $payloadAddInventory = [
                "inventory_item_id" => $inventoryItemId,
                "location_id" => 92170846490,
                "available_adjustment" => $inventoryQuantity
            ];
            $res = $this->makeShopifyRequest("POST", $inventoryUrlAdjust, $payloadAddInventory);
            return true;
        }
        else
        {
            echo "ISSUE WITH THE INVENTORY API";
        }

        return false;
    }

    private function createVariants($variants, $productId, $imageIds)
    {
        $variantsResponse = [];
        $imageIdIndex = 0;
        foreach ($variants as $variant) {
            $variantData = [
                "variant" => [
                    "option1" => $variant['fullCode'],
                    "product_id" => $productId,
                    "sku"=> $variant['fullCode'], // Assuming simpleCode is the option1
                    "price" => $variant['markupprice']
                ]
            ];

            // Assign image ID only if available
            if (!empty($imageIds)) {
                $variantData["variant"]["image_id"] = $imageIds[$imageIdIndex];
                $imageIdIndex = ($imageIdIndex + 1) % count($imageIds); // Increment index and loop back to start
            }
    
            // Make a POST request to create variant
            $variantResponse = $this->makeShopifyRequest("POST", "/admin/api/2022-01/products/{$productId}/variants.json", $variantData);
            $shopify_id;
            if (isset($variantResponse['variant'])) {
                
                $variantId = $variantResponse['variant']['id'];
                $shopify_id = $variantResponse['variant']['product_id'];
                $inventoryQuantity = $variant['stock']; // Assuming 'stock' is the inventory quantity
                $this->updateInventory($productId, $variantId, $inventoryQuantity);
                $updateVariant = Variant::find($variant->id);
                $updateVariant->update([
                    'shopify_variant_id' => $variantResponse['variant']['id']
                ]);
            }
           
            $variantsResponse[] = $variantResponse;
        }

        // delete default title from the product
        $checkShopify = $this->getShopifyProductId($shopify_id);
        if(isset($checkShopify['id']))
        {
            foreach($checkShopify['variants'] as $var)
            {
                if($var['title'] == 'Default Title')
                {
                    $id = $var['id'];
                    $variantResponse = $this->makeShopifyRequest("DELETE", "/admin/api/2022-01/products/$shopify_id/variants/$id.json", "");
                }
            }
        }
        

    
        return $variantsResponse;
    }
    


    private function makeShopifyRequest($method, $endpoint, $data)
    {
        $curl = curl_init();

        $url = "https://{$this->shopify_domain}{$endpoint}";

        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_POSTFIELDS => $method=='GET' || $method == 'DELETE'?'':json_encode($data),
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                'Authorization: Basic ' . base64_encode("$this->client_id:$this->client_secret")
            ),
        ));

        $response = curl_exec($curl);

        if ($response === false) {
            // Handle error
            $error = curl_error($curl);
            curl_close($curl);
            return ["error" => $error];
        }

        curl_close($curl);

        return json_decode($response, true);
    }

    // Ending Shopify methods

    function generateVendorToken()
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://identity.amrod.co.za/VendorLogin',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS =>'{
            "UserName": "johan@splssh.co.za",
            "Password": "Jansen12!",
            "CustomerCode": "027458"
        }',
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json',
            'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkZEN0Y2NjRDNDcwNEZFQ0Q2QzJFOTM1OTZFODg3OEY2OTZERkJDNjFSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6Il9YOW1URWNFX3Mxc0xwTlpib2g0OXBiZnZHRSJ9.eyJuYmYiOjE3MTQyMDg2NjUsImV4cCI6MTcxNDIxMjI2NSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5hbXJvZC5jby56YSIsImNsaWVudF9pZCI6InZlbmRvckNsaWVudCIsInN1YiI6IjkzM2E0YmY0LTNmNDgtNDE5ZC04NDYwLTkxMGFmMGVhYzQxNiIsImF1dGhfdGltZSI6MTcxNDIwODY2NSwiaWRwIjoibG9jYWwiLCJyb2xlIjpbIlZlbmRvciBBUEkiLCJBbXJvZCBXZWJzaXRlIl0sInBlcm1pc3Npb24iOiJDVi5BbGwiLCJ0aWVyIjoiQ2hyb21lIiwiZXhjbHVkZXNXb3Jrd2VhckRpc2NvdW50UGVyY2VudGFnZSI6dHJ1ZSwiY3VzdG9tZXJDb2RlIjoiMDI3NDU4IiwicmVnaW9uQ29kZSI6IlNBIiwidXNlciI6ImpvaGFuQHNwbHNzaC5jby56YSIsIndvcmt3ZWFyRGlzY291bnRQZXJjZW50YWdlIjowLCJmaXJzdE5hbWUiOiJKb2hhbiIsImxhc3ROYW1lIjoiSm9oYW4iLCJkeW5hbWljc0lkIjoiOWNmMjI1ZDctYmJmOC1lZTExLWExZmUtNjA0NWJkODk1ZmU0IiwianRpIjoiODlEN0NCODU4QUJCOEE0Q0UyOTc3RUZBQTM2QzU1QUYiLCJpYXQiOjE3MTQyMDg2NjUsInNjb3BlIjpbImNhdGFsb2d1ZUFQSSJdLCJhbXIiOlsicHdkIl19.H_qnnC2L02oQrnW31oO44-lwrZGbzVTTBTz5qCZWtExTNnqMSYJWRBSDlxRYohFuPHWa7ACLszImFf74-10sG94otUZic7kkiWUgtR4ETfLTxm221Zn7I0RpcLO8W-2Y0FI1FIsPsH-1utnV9QwXKriiaVvuOkkUt-mrGLGVm520hza0VosQ3y3MqfwxSgOiBkZu8bMx5ZwzDxWr8p3wZAfigkKAjazgfOHegYD4wy1JAy_gAeNq7dsEawmEfEKHCQ42tWfCReVJnc16SgRVufc5okSYRtdIiQ06CR2T8tXnYQ_7X54K6yGrxQCJ2RmVYdPzO0c5pGuFbYyAWg3ZVw'
        ),
        ));

        $response = curl_exec($curl);
        $response = json_decode($response,true);

        curl_close($curl);

        return $response;
    }

    // fetch products from the api
    function fetchProductsFromAPI($endpoint="Products")
    {
        $token = $this->generateVendorToken();
        $token = $token['token'];
    
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://vendorapi.amrod.co.za/api/v1/$endpoint",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                "Authorization: Bearer $token"
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        $response = json_decode($response,true);
        return $response;
    }

    

    public function connectShopifyStore($url,$apikey,$access_token,$version)
    {
        // echo "https://$apikey:$access_token@$url/admin/api/2022-01/shop.json";
        // echo "https://$apikey:$access_token@$url/admin/api/2022-01/shop.json";
        // exit;
        $curl = curl_init();    
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://$apikey:$access_token@$url/admin/api/2022-01/shop.json",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
        ));
        $response = curl_exec($curl);
        if(curl_errno($curl)){
            $error_msg = curl_error($curl);
            // Handle error here if needed
        }
        curl_close($curl);
        $response = json_decode($response,true);
   
        return $response;
    }
    public function index()
    {
        return view('admin.dashboard');
    }

    // Shopify store setup

    public function shopifyStoreSetup()
    {
        $store = $this->store;
        return view('admin.store.setup')->with('store',$store); 
    }

    public function connectStore(Request $request)
    {
       $result = $this->connectShopifyStore($request->url,$request->apikey,$request->access_token,$request->version);
       $message = 'connection failed';
       if(isset($result['shop']))
       {
            $data = array(
                'base_url' => $result['shop']['myshopify_domain'],
                'client_id' => $request->apikey,
                'client_secret' => $request->access_token,
                'shopify_store_id' => $result['shop']['id'],
                'shopify_domain' => $result['shop']['myshopify_domain'],
                'shopify_store_name' => $result['shop']['name'],
                'shopify_store_email' => $result['shop']['email'],
                'shopify_store_country' => $result['shop']['country_name'],
                'shopify_primary_location' => $result['shop']['primary_location_id'],
            );
           // store data into the db
            $data = Store::insert($data);

            return redirect()->back()->with(['message'=> 'success' , "store" => $this->store]);
       }
       return redirect()->back()->with(['message'=> $message , "store" => $this->store]);
    }

    // Ending shopify store setup


    // Product Section

    public function products()
    {
        $products = Product::paginate(30);
        return view('admin.product.index')->with('products',$products);
    }
    public function viewProductStructure($id)
    {
        $product = Product::find($id);
        $product = $product->productjson;
        $product = json_decode($product);
        echo "<pre>";
        print_r($product);
        echo "</pre>";
    }

    public function storeProduct($productData,$productJson)
    {
      
  
        $categorisedAttribute =  json_encode($productData['categorisedAttribute'],true);
        $categories = json_encode($productData['categories'],true);
        $brand = json_encode($productData['brand'],true);
        $relatedCodes = json_encode($productData['relatedCodes'],true);
        $matchingCodes = json_encode($productData['matchingCodes'],true);
        $groupingCodes = json_encode($productData['groupingCodes'],true);
        $groupingCodeGiftsets = json_encode($productData['groupingCodeGiftsets'],true);
        $keywords = json_encode($productData['keywords'],true);
        $tags = json_encode($productData['tags'],true);
        $inventoryType = json_encode($productData['inventoryType'],true);
        $images = json_encode($productData['images'],true);
        $colourImages = json_encode($productData['colourImages'],true);
        $logo24Branding = json_encode($productData['logo24Branding'],true);


        $storedProduct = Product::where('simpleCode', $productData['simpleCode'])->where('fullCode', $productData['fullCode'])->first();

        if(!$storedProduct)
        {
            
            
            $product = new Product([
                'simpleCode' => $productData['simpleCode'],
                'productjson' => $productJson,
                'fullCode' => $productData['fullCode'],
                'categorisedAttribute' => $categorisedAttribute, //array,
                'gender' => $productData['gender'],
                'material' => $productData['material'],
                'fit' => $productData['fit'],
                'feature' => $productData['feature'] ?? null,
                'categories' => $categories, // array,
                'brand' => $brand,  // array,
                'companionCodes' => $productData['companionCodes'],
                'relatedCodes' => $relatedCodes,
                'matchingCodes' => $matchingCodes,
                'groupingCodes' => $groupingCodes,
                'groupingCodeGiftsets' => $groupingCodeGiftsets,
                'productName' => $productData['productName'],
                'description' => $productData['description'],
                'companionCodes' => $productData['minimum'],
                'maximum' => $productData['maximum'],
                'incrementedBy' => $productData['incrementedBy'],
                'keywords' => $productData['keywords'],
                'inventoryType' => $inventoryType,
                'behaviour' => $productData['behaviour'],
                'madeToOrder' => $productData['madeToOrder'],
                'madeToOrderMessage' => $productData['madeToOrderMessage'],
                'displayCountryOfOrigin' => $productData['displayCountryOfOrigin'],
                'promotion' => $productData['promotion'],
                'fullBrandingGuide' => $productData['fullBrandingGuide'],
                'logo24BrandingGuide' => $productData['logo24BrandingGuide'],
                'images' => $images != 'null' ? $images : '',
                'colourImages' => $colourImages != 'null' ? $colourImages : '',
                'isLogo24' => $productData['isLogo24'],
                'logo24Branding' => $logo24Branding,
                // 'brandingTemplates' => $productData['brandingTemplates'],
                'decoupled' => $productData['decoupled'],
                'type' => $productData['type'],
            ]);
            $product->save();

            $lastProdutId = $product->id;


            foreach($productData['variants'] as $variant)
            {
                
                $checkVariant = Variant::where('simpleCode', $variant['simpleCode'])
                ->where('fullCode', $variant['fullCode'])
                ->where('productid', $lastProdutId)
                ->first();   
                if(!$checkVariant)
                {
                    $newVariant = new Variant([
                        'productid' => $lastProdutId,
                        'simpleCode' => $variant['simpleCode'],
                        'fullCode' => $variant['fullCode'],
                    ]);
                    $newVariant->save();
                }
            }

        }
        else
        {
            $lastProdutId = $storedProduct->id;
        
            $storedProduct->update([
                'simpleCode' => $productData['simpleCode'],
                'productjson' => $productJson,
                'fullCode' => $productData['fullCode'],
                'categorisedAttribute' => $categorisedAttribute, //array,
                'gender' => $productData['gender'],
                'material' => $productData['material'],
                'fit' => $productData['fit'],
                'feature' => $productData['feature'] ?? null,
                'categories' => $categories, // array,
                'brand' => $brand,  // array,
                'companionCodes' => $productData['companionCodes'],
                'relatedCodes' => $relatedCodes,
                'matchingCodes' => $matchingCodes,
                'groupingCodes' => $groupingCodes,
                'groupingCodeGiftsets' => $groupingCodeGiftsets,
                'productName' => $productData['productName'],
                'description' => $productData['description'],
                'companionCodes' => $productData['minimum'],
                'maximum' => $productData['maximum'],
                'incrementedBy' => $productData['incrementedBy'],
                'keywords' => $productData['keywords'],
                'inventoryType' => $inventoryType,
                'behaviour' => $productData['behaviour'],
                'madeToOrder' => $productData['madeToOrder'],
                'madeToOrderMessage' => $productData['madeToOrderMessage'],
                'displayCountryOfOrigin' => $productData['displayCountryOfOrigin'],
                'promotion' => $productData['promotion'],
                'fullBrandingGuide' => $productData['fullBrandingGuide'],
                'logo24BrandingGuide' => $productData['logo24BrandingGuide'],
                'images' => $images != 'null' ? $images : '',
                'colourImages' => $colourImages != 'null' ? $colourImages : '',
                'isLogo24' => $productData['isLogo24'],
                'logo24Branding' => $logo24Branding,
                'brandingTemplates' => $productData['brandingTemplates'],
                'decoupled' => $productData['decoupled'],
                'type' => $productData['type'],

            ]);
            foreach($productData['variants'] as $variant)
            {
                $checkVariant = Variant::where('simpleCode', $variant['simpleCode'])->where('fullCode', $variant['fullCode'])->where('productid', $lastProdutId)->first();
                if(!$checkVariant)
                {
                    $newVariant = new Variant([
                        'simpleCode' => $variant['simpleCode'],
                        'fullCode' => $variant['fullCode'],
                        'productid' => $lastProdutId
                      
                    ]);
                    $newVariant->save();
                }
                else
                {
                    $checkVariant->update([
                        'simpleCode' => $variant['simpleCode'],
                        'fullCode' => $variant['fullCode']
                    ]);
                }
                
            }
        }

        return $storedProduct;

        
    }

    public function imageUrlToBase64($imageUrl) {
          
        $imageData = file_get_contents($imageUrl);
        $base64 = base64_encode($imageData);
        return $base64;
    }
    
    public function getProductStatus($inventoryAvailable, $stockStatus) {
        if ($inventoryAvailable === "Y" && $stockStatus === "S") {
            return "active"; // Product is in stock
        } else {
            return "draft"; // Product is out of stock or indented
        }
    }

    private function getShopifyProductId($id)
    {
        $curl = curl_init();

        // // shopify'

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://$this->client_id:$this->client_secret@$this->shopify_domain/admin/api/2022-01/products/" . $id . '.json',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json'
            ),
        ));
    
        $response = curl_exec($curl);
    
        curl_close($curl);
    
        $responseData = json_decode($response, true);
    
        // Check if the product exists in Shopify
        if (isset($responseData['product']) && !empty($responseData['product'])) {
            return $responseData['product'];
        }
    
        return null;
    }
    
    public function storeShopifyProducts($productData,$id)
    {
        $shopifyProductId = $this->getShopifyProductId($id);
        if ($shopifyProductId) {
            // Product exists in Shopify, update it
            return $this->updateShopifyProduct($productData, $id);
        } else {
            // Product does not exist in Shopify, create it
            return $this->createShopifyProduct($productData);
        }
    }

    private function createShopifyProduct($productData)
    {
        // fetch Variants
        $variant = $this->getVariants($productData->id);

        $images = [];
        $hasImage = false;
        // if($productData->colourImages)
        // {
        //     $imag = json_decode($productData->colourImages,true);
        //     $position = 1;

        //     foreach($imag as $img)
        //     {
        //         $url = isset($img['images'][0]['urls'][0]['url'])?$img['images'][0]['urls'][0]['url']:"https://documentation.agilepoint.com/00/appbuilder/images/cloudformImagePickerWin.jpg";
        //         $images[] = array(
        //             'position' => $position,
        //             "metafields" => 
        //             [
        //                 [
        //                     "key" => "image",
        //                     "value" => $img['name'],
        //                     "type" => "single_line_text_field",
        //                     "namespace" => "global"
        //                 ]
        //             ],
        //             "attachment" => $this->imageUrlToBase64($url)
        //         );
        //         $position++;
        //     }
            
            
        // }
        // else
        // {
            $productData->images = json_decode($productData->images,true);
            $position = 1;
            foreach($productData->images as $image)
            {
                $images[] = array(
                        'position' => $position,
                        "metafields" => 
                        [
                            [
                                "key" => "image",
                                "value" => $image['name'],
                                "type" => "single_line_text_field",
                                "namespace" => "global"
                            ]
                        ],
                        "attachment" => $this->imageUrlToBase64($image['urls'][0]['url'])
                    );
                    $position++;
            }
            $hasImage  = true;
        // }


        $baseProductResponse = $this->createBaseProduct($productData);

        // update Shopify Product ID

        $productInDb = Product::find($productData->id);
        $productData->update([
            "shopify_product_id" => $baseProductResponse['product']['id']
        ]);

            // Check if base product creation was successful
        if (isset($baseProductResponse['error'])) {
            return $baseProductResponse;
        }
        $productId = $baseProductResponse['product']['id'];
        $imageIds = $this->storeImages($images, $productId);

        $variantsResponse = $this->createVariants($variant, $productId, $imageIds);


        return $variantsResponse;




        // $curl = curl_init();

        // $data = [
        //     "product" => [
        //         "title" => $productData->productName,
        //         "body_html" => $productData->description,
        //         "product_type" => "simple",
        //         "handle" => $productData->fullCode,
        //         "options" => [
        //             [
        //                 "name" => "Title",
        //                 "position" => 1,
        //                 "values" => ["Default Title"]
        //             ]
        //         ],
        //     ]
        // ];

        // if ($hasImage) {
        //     $data['product']['images'] = $images;
        // }

      
        // $data = json_encode($data);
        
        // curl_setopt_array($curl, array(
        //     CURLOPT_URL => "https://$this->client_id:$this->client_secret@$this->shopify_domain/admin/api/2022-01/products.json",
        //     CURLOPT_RETURNTRANSFER => true,
        //     CURLOPT_ENCODING => '',
        //     CURLOPT_MAXREDIRS => 10,
        //     CURLOPT_TIMEOUT => 0,
        //     CURLOPT_FOLLOWLOCATION => true,
        //     CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        //     CURLOPT_CUSTOMREQUEST => 'POST',
        //     CURLOPT_POSTFIELDS => $data,
        //     CURLOPT_HTTPHEADER => array(
        //         'Content-Type: application/json'
        //     ),
        // ));

        // $response = curl_exec($curl);

        // curl_close($curl);

        // return json_decode($response, true);
    }

    private function updateShopifyProduct($productData, $shopifyProductId)
    {
        $curl = curl_init();

        $data = [
            "product" => [
                "title" => $productData['description'],
                "body_html" => $productData['description1'] . " " . $productData['description2'] . " " . $productData['description3'],
                "vendor" => $productData['brand'],
                "product_type" => "simple",
                "variants" => [
                    [
                        "option1" => "Default Title",
                        "price" => $productData['prices'][0]['basePrice']['incTax'],
                        "sku" => $productData['code'],
                        "inventory_management" => "shopify",
                        "inventory_policy" => "continue",
                        "fulfillment_service" => "manual",
                        "inventory_quantity" => $productData['inventoryAvailable'] === 'Y' ? 1 : 0,
                        "requires_shipping" => true
                    ]
                ],
                "options" => [
                    [
                        "name" => "Title",
                        "position" => 1,
                        "values" => ["Default Title"]
                    ]
                ],
                "tags" => $productData['slugs'],
                "status" => $this->getProductStatus($productData['inventoryAvailable'], $productData['stockStatus'])
            ]
        ];

        if (count($productData['images'])) {
            $imageUrl = 'https://rgs-api.prontoavenue.biz' . $productData['images'][0]['url'];
            $data['product']['images'] = [
                [
                    "position" => 1,
                    "metafields" => [
                        [
                            "key" => "image",
                            "value" => "image",
                            "type" => "single_line_text_field",
                            "namespace" => "global"
                        ]
                    ],
                    "attachment" => $this->imageUrlToBase64($imageUrl)
                ]
            ];
        }

        $data = json_encode($data);

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://$this->client_id:$this->client_secret@$this->shopify_domain/admin/api/2022-01/products/" . $shopifyProductId . '.json',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'PUT',
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        return json_decode($response, true);
    }



    public function storeProductInShopify($product)
    {
        $store = $this->store;
        if($store)
        {
            $url = "https://$this->client_id:$this->client_secret@$this->shopify_domain/admin/api/2022-01/shop.json";

        }
    }

    public function syncProduct()
    {
        $totalProduct = 0;

        if(!$this->store)
        {
            
            return redirect()->back()->with('message','Please Connect Your Shopify Store, to sync the produts');
        }

        do {
            $response = $this->fetchProductsFromAPI();

            $products = $response;
            $countproducts = 0;
            foreach ($products as $product) {
                $response = json_encode($product,true);
                if($countproducts == 10)
                {
                    echo "EXIT HERE";
                    exit;
                }
                $this->storeProduct($product,$response);
                $countproducts++;
            }
        } while ($page < count($products));
       
        return redirect()->back()->with('count',$totalProduct);
    }

    public function syncProductsToShopify()
    {
        // Get the last processed product ID from the pagination table
        $pagination = Pagination::firstOrNew([]);
        $lastProcessedProductId = $pagination->lastProcessedProductId ?? 0;
    
        // Fetch products starting from the last processed product ID
        $products = Product::where('id', '>', $lastProcessedProductId)->paginate(5);
        foreach ($products as $product) {
            // Check if product is already in Shopify
            $checkProductInShopify = $this->getShopifyProductId($product->shopify_product_id);
            if (!$checkProductInShopify) {
                $this->createShopifyProduct($product);
            }
    
            // Update the last processed product ID
            $lastProcessedProductId = $product->id;
        }
    
        // Update pagination information
        $pagination->lastProcessedProductId = $lastProcessedProductId;
        $pagination->save();
    
        return redirect()->back();
    }
    




    private function storeProductImages($images)
    {
        $imageUrls = [];

        foreach ($images as $image) {
            // Save image locally or to storage service
            $imageUrl = $this->saveProductImage($image);
            $imageUrls[] = $imageUrl;
        }

        return $imageUrls;
    }

    public function getVariants($id)
    {
        $variants = Variant::where('productid',$id)->get();
        return $variants;
    }

    // Ending Product Section


    // Activity Logs
    public function findActivityById($id)
    {
        
    }

    // Ending Activity logs
    

    // stocks

    public function stocks()
    {
        $products = Variant::paginate(30);
        return view('admin.stocks.index')->with('products',$products);

    }

    public function fetchStocks()
    {
        $response = $this->fetchProductsFromAPI('Stock');
        foreach($response as $stock)
        {
            $checkVariant = Variant::where('simpleCode', $stock['simpleCode'])->where('fullCode', $stock['fullCode'])->first();
            if($checkVariant)
            {   
               

                $checkVariant->update([
                    'stock' => $stock['stock']
                ]);
                echo "<br>";
                echo "<br>";
            }
            else
            {
                echo "STOCKS NOT FOUND";
                echo "<br>";
                echo "<br>";
            }
        }
        return redirect()->back();
    }


    // Fetch prices

    public function fetchPrices()
    {
        $response = $this->fetchProductsFromAPI('Prices');

        foreach($response as $price)
        {
      
            $checkVariant = Variant::where('simpleCode', $price['simplecode'])->where('fullCode', $price['fullCode'])->first();
            if($checkVariant)
            {
                $margin = 44;
                $markupprice = ($margin / 100 * $price['price']) + $price['price'];
                $checkVariant->update([
                    'price' => $price['price'],
                    'margin' => $margin,
                    'markupprice' => $markupprice
                ]);
                echo "<br>";
                echo "<br>";
            }
            else
            {
                echo "Product NOT FOUND";
                echo "<br>";
                echo "<br>";
            }
        }
        return redirect()->back();
    }
    
}
