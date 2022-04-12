<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\AgencyController;
use App\Http\Controllers\API\ContentController;
use App\Http\Controllers\API\PlannerController;

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
Route::get('pariwisata/{id}', [ContentController::class, 'getPariwisataByID']);

Route::get('kategori/', [ContentController::class, 'showKategori']);

Route::get('paket/', [ContentController::class], 'showPaket');
Route::get('paket/{id}', [ContentController::class], 'getPaketByID');
Route::post('paket/create', [AgencyController::class], 'createPaket');
Route::get('paket/edit{id}', [AgencyController::class], 'edit');
Route::put('paket/update/{id}', [AgencyController::class], 'update');
Route::delete('paket/delete/{id}', [AgencyController::class], 'delete');

Route::get('planner/', [ContentController::class], 'showPlanner');
Route::get('planner/{id}', [ContentController::class], 'getPlannerByID');
Route::post('planner/create', [PlannerController::class], 'createPlanner');
Route::post('planner/{id}/add/{wisataID}', [PlannerController::class], 'addToPlanner');
Route::delete('planet/delete/{id}', [PlannerController::class], 'delete');

/*
Route::middleware(['auth:sanctum', 'isAPIAdmin'])->group(function(){
    Route::post('pariwisata/create', [AdminController::class], 'createPariwisata');
    Route::get('pariwisata/edit{id}', [AdminController::class], 'edit');
    Route::put('pariwisata/update/{id}', [AdminController::class], 'update');
    Route::delete('pariwisata/delete/{id}', [AdminController::class], 'delete');
});

Route::middleware(['auth:sanctum', 'isAPIAgency'])->group(function(){
    Route::get('paket/', [ContentController::class], 'showPaket');
    Route::post('paket/create', [AgencyController::class], 'store');
    Route::get('paket/edit{id}', [AgencyController::class], 'edit');
    Route::put('paket/update/{id}', [AgencyController::class], 'update');
    Route::delete('paket/delete/{id}', [AgencyController::class], 'delete');

});
*/

Route::middleware(['auth:sanctum'])->group(function(){
    Route::post('logout', [AuthController::class], 'logout');
});