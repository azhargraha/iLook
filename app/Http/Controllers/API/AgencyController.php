<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Paket;
use App\Models\PaketPariwisata;
use Illuminate\Support\Facades\Validator;

class AgencyController extends Controller
{
    public function createPaket(Request $request){
        $validator = Validator::make($request->all(), [
            'nama'=> 'required',
            'deskripsi'=>'required',
            'thumbnailUrl' =>'required|image|mimes:jpg,png,jpeg',
        ]);
    
        if($validator->fails()){
            return response()->json([
                'status'=>400,
                'validation_errors' => $validator->messages(),
            ]);
        }else{
            if (auth('sanctum')->check()){
                $paket = new Paket;
                $paket->nama = $request->nama;
                $paket->deskripsi = $request->deskripsi;
                $gambar = $request->file('urlGambar');
                $gambar_uploaded_path = $gambar->store('gambar', 'public');

                $paket->thumbnailUrl = $gambar_uploaded_path;
                // $paket->userID = auth('sanctum')->user()->id;
                $paket->save();
                return response()->json([
                    'status'=>200,
                    'message'=>'Data has been added successfully',
                ]);
            }else {
                return response()->json([
                    'status' => 401,
                    'message' => 'Please login first',
                ]);
            }
            
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
            'thumbnailUrl' => 'image|mimes:jpg,png,jpeg'
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
                if($request->hasFile('thumbnailUrl')){
                    $gambarURL = $paket->thumbnailUrl;
                    $path = substr($gambarURL, strpos($gambarURL, 'gambar/') + 7);
                    if(Storage::disk('gambar')->exists($path)){
                        Storage::disk('gambar')->delete($path);
                    }
                    $gambar = $request->file('urlGambar');
                    $gambar_uploaded_path = $gambar->store('gambar', 'public');
                    $pariwisata->urlGambar = $gambar_uploaded_path;
                }            
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

    public function addPariwisataToPaket(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'wisataID'=> 'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'validation_errors' => $validator->messages(),
            ]);
        }else {
            $paketPariwisata = new PaketPariwisata;
            $paketPariwisata->wisataID = $request->wisataID;
            $paketPariwisata->paketID = $id;
            $paketPariwisata->save();
            return response()->json([
                'status'=>200,
                'message'=>'Data has been added successfully',
            ]);
        }

    }
}
