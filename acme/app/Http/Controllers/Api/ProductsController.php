<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductsController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => true,
            'data' => Product::all()
        ]);
    }
    public function show($id)
    {
        return response()->json([
            'status' => 'success',
            'data' => Product::where('slug',$id)->get()->first()
        ]);
    }
}
