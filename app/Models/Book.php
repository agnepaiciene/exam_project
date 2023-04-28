<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'ISBN',
        'image',
        'pages',
        'category_id'
    ];

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function scopeFilter(Builder $query, $filter){

        if ($filter->name!=null){
            $query->where("name", "like", "%$filter->name%");
        }
//        if ($filter->description!=null){
//            $query->where("description", "like", "%$filter->description%");
//        }
//        if ($filter->ISBN!=null){
//            $query->where("ISBN", "like", "%$filter->ISBN%");
//        }
//        if ($filter->pages!=null){
//            $query->where("pages", "like", "%$filter->pages%");
//        }
        if ($filter->category_id!=null){
            $query->where("category_id","like", "%$filter->category_id%");
        }

    }

    public function scopeOrder(Builder $query, $order){
        if ($order->field!=null){
            if ($order->dir!=null){
                $query->orderBy($order->field, $order->dir);
            }else{
                $order->orderBy($order->field);
            }
        }
    }

}
