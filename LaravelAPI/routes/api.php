<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryAPI;
use App\Http\Controllers\ProductAPI;
use App\Http\Controllers\BillApi;
use App\Http\Controllers\CustomerApi;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\FeedbackAPI;



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
Route::post('/addcategory',[CategoryAPI::class,'AddCategory']);
Route::get('/addcategorytable',[CategoryAPI::class,'AddCategoryTable']);
Route::get('/addcategorytable',[CategoryAPI::class,'AddCategoryTable']);

Route::post('/checkexistscategory',[CategoryAPI::class,'CheckExistsCategory']);

//PRODUCTS
Route::get('/selectallproducts',[ProductAPI::class, 'SelectProducts']);
Route::get('/selectproductsbycate', [ProductAPI::class, 'SelectProductsByCategory']);
Route::get('/selectproductsbystartdate', [ProductAPI::class, 'SelectProductsByStartDate']);
Route::get('/selectproductsbyenddate', [ProductAPI::class, 'SelectProductsByEndDate']);
Route::get('/selectproductstop15', [ProductAPI::class, 'SelectProductsTop15ByCountCustomerId']);
Route::post('/addproduct',[ProductAPI::class,'AddProduct']);
Route::get('/addproducttable',[ProductAPI::class,'AddProductTable']);

Route::post('/checkexistsproduct',[ProductAPI::class,'CheckExistsProduct']);
//feedback
Route::post('/addcomment',[FeedbackAPI::class,'AddComment']);
Route::get('/showcomment',[FeedbackAPI::class,'ShowComment']);


//BILL
Route::post('/submitcart',[BillApi::class, 'InsertBill']);

//CUSTOMER
Route::post('/customerregister',[CustomerApi::class, 'CustomerRegister']);
Route::post('/isemailexists',[CustomerApi::class, 'IsEmailExists']);
Route::post('/customerlogin',[CustomerApi::class, 'CustomerLogin']);
Route::post('/customerlogout',[CustomerApi::class, 'CustomerLogOut']);
Route::post('/customerupdateinfo',[CustomerApi::class, 'CustomerUpdateInfo']);
Route::post('/customerchangeavatar',[CustomerApi::class, 'CustomerChangeAvatar']);
Route::post('/customerchangepassword',[CustomerApi::class, 'CustomerChangePassword']);
Route::post('/customercheckpassword',[CustomerApi::class, 'CustomerCheckPassword']);
Route::post('/customerforgetpassword',[CustomerApi::class, 'CustomerForgetPassword']);

Route::get('/customerautionhistory',[CustomerApi::class, 'CustomerAutionHistory']);
Route::get('/customerbillhistory',[CustomerApi::class, 'CustomerBillHistory']);
Route::get('/customernewbill',[CustomerApi::class, 'CustomerNewBill']);

Route::get('/customerinfo',[CustomerApi::class, 'CustomerInfo']);

// Route::get('/selectactiveblog',[BlogApi::class, 'SelectActiveBlog']);

// ---------------------- ADMIN -------------------------//

// LOGIN
Route::post('/login',[AdminController::class, 'Login']);
Route::post('/logout', [AdminController::class, 'Logout']);
Route::get('/getaccount',[AdminController::class, 'Getaccount']);

// BILL
Route::get('/selectbill',[BillApi::class, 'SelectBill']);
Route::post('/insertbill',[BillApi::class, 'InsertBill']);

//CHART
Route::get('/revenueeachmonth', [BillApi::class, 'RevenueEachMonth']);
Route::get('/revenueeachyear', [BillApi::class, 'RevenueEachYear']);
Route::get('/toployalcustomer', [BillApi::class, 'TopLoyalCustomer']);
Route::get('/bestcategoryseller', [BillApi::class, 'BestCategorySeller']);
