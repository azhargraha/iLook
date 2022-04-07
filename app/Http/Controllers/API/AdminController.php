<?php

namespace App\Http\Controllers\API;

use App\Models\Pariwisata;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function createPariwisata(Request $request){
        $validator = Validator::make($request->all(), [
            'nama'=> 'required',
            'kategoriID'=>'required',
            'harga'=>'required',
            'deskripsi'=>'required',
            'lokasi'=>'required',
        ]);
    
        if($validator->fails()){
            return response()->json([
                'status'=>400,
                'validation_errors' => $validator->messages(),
            ]);
        }else{
            $pariwisata = new Pariwisata;
            $pariwisata->nama = $request->input('nama');
            $pariwisata->kategoriID = $request->input('kategoriID');
            $pariwisata->harga = $request->input('harga');
            $pariwisata->deskripsi = $request->input('deskripsi');
            $pariwisata->lokasi = $request->input('lokasi');
            $pariwisata->rating = NULL;
            $pariwisata->save();
            return response()->json([
                'status'=>200,
                'message'=>'Data has been added successfully',
            ]);
        }
    }
    public function edit($id){
        $pariwisata = Pariwisata::find($id);
        if($pariwisata){
            return response()->json([
                'status' => 200,
                'pariwisata'=>$pariwisata,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message'=>'No Pariwisata ID found',
            ]);
        }
    }

    public function update(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'nama'=> 'required',
            'kategoriID'=>'required',
            'harga'=>'required',
            'deskripsi'=>'required',
            'lokasi'=>'required',
        ]);
    
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'validation_errors' => $validator->messages(),
            ]);
        }else{
            $pariwisata = Pariwisata::find($id);
            if($pariwisata){
                $pariwisata->nama = $request->nama;
                $pariwisata->kategoriID = $request->kategoriID;
                $pariwisata->harga = $request->harga;
                $pariwisata->deskripsi = $request->deskripsi;
                $pariwisata->lokasi = $request->lokasi;
                $pariwisata->rating = NULL;
                $pariwisata->save();
                return response()->json([
                    'status'=>200,
                    'message'=>'Pariwisata data has been updated successfully',
                ]);
            }
            else{
                return response()->json([
                    'status'=>404,
                    'message'=>'No Pariwisata ID Found',
                ]);
            }
        }
    }

    public function delete($id){
        $pariwisata = Pariwisata::find($id);
        if($pariwisata){
            $pariwisata->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Data pariwisata has been deleted',
            ]);
        }else {
            return response()->json([
                'status'=>404,
                'message'=>'No Pariwisata ID Found',
            ]);
        }
    }

}
