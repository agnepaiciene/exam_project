<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $emFilter=new \stdClass();
        $emFilter->name=null;

        $emOrder=new \stdClass();
        $emOrder->field=null;
        $emOrder->dir=null;

        $filter=$request->session()->get("category_filter", $emFilter);
        $order=$request->session()->get("category_order", $emOrder);

        return inertia('Categories/Index', [
        "categories"=>Category::filter($filter)->order($order)->get(),
            "filter"=>$filter,
            "order"=>$order,

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Categories/Create', [
            "categories"=>Category::all(),
            "books"=>Book::all()

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $category=new Category();
        $category->name=$request->name;
        $category->save();
        return to_route("categories.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return inertia('Categories/Edit', [
            "category"=>$category,
            "books"=>Book::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $category->fill($request->all());

        $category->save();
        return to_route("categories.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return to_route("categories.index");
    }

    public function filter(Request $request){

        $filter=new \stdClass();
        $filter->name=$request->name;


        $request->session()->put("category_filter",$filter);
        to_route("categories.index");

    }

    public function order($field, $dir, Request $request){
        $order=new \stdClass();
        $order->field=$field;
        $order->dir=$dir;
        $request->session()->put("category_order",$order);
        to_route("categories.index");
    }
}
