<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return Inertia::render('Home');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('/dashboard', function () {
        return to_route('books.index');
    })->middleware(['auth', 'verified'])->name('dashboard');




Route::post("/categories/filter", [CategoryController::class, "filter"])->name("categories.filter");
Route::get("/categories/order/{field}/{dir}", [CategoryController::class, "order"])->name("categories.order");

Route::post("/books/filter", [BookController::class, "filter"])->name("books.filter");
Route::get("/books/order/{field}/{dir}", [BookController::class, "order"])->name("books.order");

});

//Route::resource('books', BookController::class)->only([
//    'index'
//]);
////Route::resource('categories', CategoryController::class);
////
//
//
//   Route::middleware(["auth","editCategories"])->group( function(){
//    Route::resource('books', BookController::class)->except([
//        'index'
//    ]);
//
//   });

Route::resource('categories', CategoryController::class);
Route::resource('books', BookController::class);

require __DIR__.'/auth.php';
