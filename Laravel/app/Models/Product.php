<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'simpleCode',
        'fullCode',
        'productjson',
        'categorisedAttribute',
        'gender',
        'material',
        'fit',
        'feature',
        'categories',
        'brand',
        'companionCodes',
        'relatedCodes',
        'matchingCodes',
        'groupingCodes',
        'groupingCodeGiftsets',
        'productName',
        'description',
        'minimum',
        'maximum',
        'incrementedBy',
        'keywords',
        'tags',
        'inventoryType',
        'behaviour',

        'madeToOrder',
        'madeToOrderMessage',
        'displayCountryOfOrigin',
        'promotion',
        'fullBrandingGuide',
        'logo24BrandingGuide',
        'images',
        'colourImages',
        'isLogo24',
        'logo24Branding',
        'brandingTemplates',
        'decoupled',
        'type',
        'shopify_product_id'
    ];
    protected $table = 'products';

    public function variants()
    {
        return $this->hasMany(Variant::class, 'productid', 'id');
    }

    public function getVariantsCountAttribute()
    {
        return $this->variants()->count();
    }
}
