<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\AgencyController;
use App\Http\Controllers\API\ContentController;

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

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('pariwisata/', [ContentController::class, 'showPariwisata']);
Route::get('pariwisata/{lokasi}', [ContentController::class, 'searchPariwisata']);
Route::post('pariwisata/create', [AdminController::class, 'createPariwisata']);
Route::get('pariwisata/edit/{id}', [AdminController::class, 'edit']);
Route::put('pariwisata/update/{id}', [AdminController::class, 'update']);
Route::delete('pariwisata/delete/{id}', [AdminController::class, 'delete']);

Route::get('kategori/', [ContentController::class, 'showKategori']);

Route::get('paket/', [ContentController::class], 'showPaket');
Route::post('paket/create', [AgencyController::class], 'store');
Route::get('paket/edit{id}', [AgencyController::class], 'edit');
Route::put('paket/update/{id}', [AgencyController::class], 'update');
Route::delete('paket/delete/{id}', [AgencyController::class], 'delete');


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::middleware(['auth:sanctum', 'isAPIAdmin'])->group(function(){
//});
