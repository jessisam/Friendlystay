<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'address',
        'price_min',
        'price_max',
        'amenities',
        'whatsapp_link',
        'images',
        'document_url',
    ];

    protected $casts = [
        'amenities' => 'array',
        'images' => 'array',
        'price_min' => 'float',
        'price_max' => 'float',
    ];
}
