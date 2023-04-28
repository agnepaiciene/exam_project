<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;

use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $emFilter=new \stdClass();
        $emFilter->name=null;
//        $emFilter->description=null;
//        $emFilter->ISBN=null;
////        $emFilter->image=null;
//        $emFilter->page=null;
        $emFilter->category_id=null;


        $emOrder=new \stdClass();
        $emOrder->field=null;
        $emOrder->dir=null;

        $filter=$request->session()->get("book_filter", $emFilter);
        $order=$request->session()->get("book_order", $emOrder);
        return inertia('Books/Index', [
            "books"=>Book::filter($filter)->order($order)->with('category')->get(),
            "filter"=>$filter,
            "order"=>$order,
            "categories"=>Category::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Books/Create', [
//            "books"=>Book::all(),
            "categories"=>Category::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $book=new Book();

        $book->name=$request->name;
        $book->description=$request->description;
        $book->ISBN=$request->ISBN;
        $book->pages=$request->pages;
        $book->category_id=$request->category_id;

        if ($request->file("image")!=null){
            $request->file("image")->store("/public/books");
            $book->image=$request->file("image")->hashName();
        }
        $book->save();
        return to_route("books.index", [

        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        return inertia('Books/Edit', [
            "book"=>$book,
            "categories"=>Category::all(),

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        $book->fill($request->all());
        if ($request->file("image")!=null) {
            if ($book->image != null) {
                unlink(storage_path() . "/app/public/books/" . $book->image);
            }
            $request->file("image")->store("public/books");
            $book->image=$request->file("image")->hashName();
        }

        $book->save();
        return to_route("books.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $book->delete();
        return to_route("books.index");
    }

    public function filter(Request $request){

        $filter=new \stdClass();

        $filter->name=$request->name;
//        $filter->description=$request->description;
//        $filter->ISBN=$request->ISBN;
//        $filter->pages=$request->pages;
        $filter->category_id=$request->category_id;

        $request->session()->put("book_filter",$filter);
        to_route("books.index");
    }

    public function order($field, $dir, Request $request){
        $order=new \stdClass();
        $order->field=$field;
        $order->dir=$dir;
        $request->session()->put("book_order",$order);
        to_route("books.index");
    }
}
