<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductsController;
use App\Http\Controllers\Api\PayPallController;


/*
Route::get('/users',[UsersController::class,'index']);
Route::get('/users/{id}',[UsersController::class,'show']);
Route::post('/users',[UsersController::class,'store']);
Route::delete('/users/{id}',[UsersController::class,'delete']);
*/
Route::resource('/users', UsersController::class);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('jwt')->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::put('/user', [AuthController::class, 'updateUser']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/payment/{amount}', [PayPallController::class, 'index']);
    Route::post('/paypal/create-order', [PayPallController::class, 'createOrder']);
    Route::post('/paypal/capture-order', [PayPallController::class, 'captureOrder']);



});

Route::get('/products', [ProductsController::class, 'index']);
Route::get('/products/{id}', [ProductsController::class, 'show']);

