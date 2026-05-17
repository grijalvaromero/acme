<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
class Products extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      
        Product::create([
            'name' => 'Planos Residencia Oakwood',
            'description' => '',
            'image' => 'product_1.jpg',
            'stock' => 10,
            'price' => 10.99,
        ]);

        Product::create([
            'name' => 'Renders 3D para departamentos',
            'description' => 'Renders 3D de alta calidad para departamentos de hasta 100 m²',
            'image' => 'product_2.jpg',
            'stock' => 20,
            'price' => 20.99,
        ]);

        Product::create([
            'name' => 'Maqueta a escala para casas',
            'description' => 'Maqueta a escala para casas de hasta 150 m²',
            'image' => 'product_3.jpg',
            'stock' => 30,
            'price' => 30.99,
        ]);
    }
}
