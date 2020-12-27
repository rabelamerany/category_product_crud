<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('category','App\Http\Controllers\Api\CategoryController@index');
Route::post('category/store','App\Http\Controllers\Api\CategoryController@store');
Route::delete('category/delete/{id}','App\Http\Controllers\Api\CategoryController@destroy');
Route::get('category/edit/{id}','App\Http\Controllers\Api\CategoryController@edit');
Route::put('category/update/{id}','App\Http\Controllers\Api\CategoryController@update');


Route::get('post','Api\PostController@index');
Route::post('post/store','Api\PostController@store');
Route::delete('post/delete/{id}','Api\PostController@destroy');
Route::get('post/edit/{id}','Api\PostController@edit');
Route::put('post/update/{id}','Api\PostController@update');
