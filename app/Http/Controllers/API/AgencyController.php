<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Paket;
use Illuminate\Support\Facades\Validator;

class AgencyController extends Controller
{
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'nama'=> 'required',
            'deskripsi'=>'required',
            'harga'=>'required',
            'planID'=>'required',
        ]);
    
        if($validator->fails()){
            return response()->json([
                'status'=>400,
                'validation_errors' => $validator->messages(),
            ]);
        }else{
            $paket = new Paket;
            $paket->nama = $request->input('nama');
            $paket->harga = $request->input('harga');
            $paket->deskripsi = $request->input('deskripsi');
            $paket->planID = $request->input('lokasi');
            $paket->save();
            return response()->json([
                'status'=>200,
                'message'=>'Data has been added successfully',
            ]);
        }
    }
    public function edit($id){
        $paket = Paket::find($id);
        if($paket){
            return response()->json([
                'status' => 200,
                'paket'=>$paket,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message'=>'No paket ID found',
            ]);
        }
    }

    public function update(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'nama'=> 'required',
            'deskripsi'=>'required',
            'harga'=>'required',
            'planID'=>'required',
        ]);
    
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'validation_errors' => $validator->messages(),
            ]);
        }else{
            $paket = Paket::find($id);
            if($paket){
                $paket->nama = $request->nama;
                $paket->harga = $request->harga;
                $paket->deskripsi = $request->deskripsi;
                $paket->planID = $request->lokasi;
                $paket->save();
                return response()->json([
                    'status'=>200,
                    'message'=>'Paket data has been updated successfully',
                ]);
            }
            else{
                return response()->json([
                    'status'=>404,
                    'message'=>'No Paket ID Found',
                ]);
            }
        }
    }

    public function delete($id){
        $paket = Paket::find($id);
        if($paket){
            $paket->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Data Paket has been deleted',
            ]);
        }else {
            return response()->json([
                'status'=>404,
                'message'=>'No Paket ID Found',
            ]);
        }
    }
}
