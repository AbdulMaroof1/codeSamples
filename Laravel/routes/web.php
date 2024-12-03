<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdmissionWebController;
use App\Http\Controllers\Api\AdmissionController;
use App\Http\Controllers\userController;
use App\Http\Controllers\channelController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();


// Admin

// Setup shopify store
Route::get('admin/store',[AdminController::class,'shopifyStoreSetup'])->name('admin.store.setup');
Route::post('admin/store/setup',[AdminController::class,'connectStore'])->name('admin.store.save');
// Ending Shopify Store Setup

// Products
Route::get('admin/products',[AdminController::class,'products'])->name('admin.products.all');
Route::get('admin/products/sync',[AdminController::class,'syncProduct'])->name('admin.products.sync');
Route::get('admin/products/{id}/structure',[AdminController::class,'viewProductStructure'])->name('admin.products.structure');
Route::get('admin/products/synctoshopify',[AdminController::class,'syncProductsToShopify'])->name('admin.products.sync.shopify');


// Stocks
Route::get('admin/stocks',[AdminController::class,'stocks'])->name('admin.stocks');

Route::get('admin/stocks/fetch',[AdminController::class,'fetchStocks'])->name('admin.fetch.stocks');

// Ending Stocks

Route::get('admin/prices/fetch',[AdminController::class,'fetchPrices'])->name('admin.prices.fetch');

