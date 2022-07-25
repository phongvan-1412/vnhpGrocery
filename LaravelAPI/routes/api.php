<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryAPI;
use App\Http\Controllers\ProductAPI;
use App\Http\Controllers\BillApi;
use App\Http\Controllers\CustomerApi;
use App\Http\Controllers\AdminController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//CATEGORIES
Route::get('/selectcategories',[CategoryAPI::class, 'SelectCategories']);
Route::post('/addcategory',[CategoryAPI::class,'AddCaterogy']);

//PRODUCTS
Route::get('/selectallproducts',[ProductAPI::class, 'SelectProducts']);
Route::get('/selectproductsbycate', [ProductAPI::class, 'SelectProductsByCategory']);
Route::get('/selectproductsbystartdate', [ProductAPI::class, 'SelectProductsByStartDate']);
Route::get('/selectproductsbyenddate', [ProductAPI::class, 'SelectProductsByEndDate']);
Route::get('/selectproductstop15', [ProductAPI::class, 'SelectProductsTop15ByCountCustomerId']);
Route::post('/addproduct',[ProductAPI::class,'AddProduct']);
//AddProductTable
Route::get('/addproducttable',[ProductAPI::class,'AddProductTable']);


//BILL
Route::post('/submitcart',[BillApi::class, 'InsertBill']);


//CUSTOMER
Route::post('/customerregister',[CustomerApi::class, 'CustomerRegister']);
Route::post('/isemailexists',[CustomerApi::class, 'IsEmailExists']);
Route::post('/customerlogin',[CustomerApi::class, 'CustomerLogin']);
Route::post('/customerupdateinfo',[CustomerApi::class, 'CustomerUpdateInfo']);


// Route::get('/selectactiveblog',[BlogApi::class, 'SelectActiveBlog']);

// ---------------------- ADMIN -------------------------//

// LOGIN
Route::post('/login',[AdminController::class, 'Login']);
// BILL
Route::get('/selectbill',[BillApi::class, 'SelectBill']);
Route::post('/insertbill',[BillApi::class, 'InsertBill']);