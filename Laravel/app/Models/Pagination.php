<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pagination extends Model
{
    use HasFactory;

    protected $fillable = [
        'current_page',
        'total_pages',
        'last_processed_product_id'
    ];

    protected $table = 'pagination';
}