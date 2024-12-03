<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'simpleCode',
        'stock',
        'price',
        'productid',
        'fullCode',
        'codeColour',
        'codeColourName',
        'codeSize',
        'codeSizeName',
        'categorisedAttribute',
        'packagingAndDimension',
        'productDimension',
        'isLogo24',
        'components',
        'shopify_variant_id',
        'margin',
        'markupprice'
    ];
    protected $table = 'variants';

    public function product()
    {
        return $this->belongsTo(Product::class, 'productid', 'id');
    }
}
