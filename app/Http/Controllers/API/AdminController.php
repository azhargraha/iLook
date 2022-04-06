<?php

namespace App\Http\Controllers\API;

use App\Models\Pariwisata;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function createPariwisata(){
        $validator = Validator::make($request->all(), [
            'namaPariwisata'=> 'required',
            'kategori'=>'required',
            'harga'=>'required',
            'alamat'=>'required',
        ]);
    
        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }else{
            $pariwisata = Pariwisata::create([
                'namaPariwisata'=> $request->namaPariwisata,
                'kategori'=> $request->kategori,
                'harga'=>$request->harga,
                'alamat'=>$request->alamat,
                'rating'=>NULL,
        ]);
        }
        return response()->json([
            'status'=>200,
            'message'=>'Data has been added successfully',
        ]);
    }
    
}
