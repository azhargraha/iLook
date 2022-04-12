<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Paket;
use App\Models\PaketContainer;
use Illuminate\Support\Facades\Validator;

class AgencyController extends Controller
{
    public function createPaket(Request $request){
        $validator = Validator::make($request->all(), [
            'nama'=> 'required',
            'deskripsi'=>'required',
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
                $paket->userID = auth('sanctum')->user()->id;
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

    public function addPlanToPaket(Request $request, $id){
        if(auth('sanctum')->check()){
            $paket = Paket::find($id);
            if ($paket){
                $validator = Validator::make($request->all(), [
                    'harga'=> 'required',
                    'paketID' => 'required',
                    'planID'=>'required',
                ]);
                if (PaketContainer::where('paketID', $id)->where('planID', $request->planID)->exists()){
                    return response()->json([
                        'status' => 400,
                        'message'=> 'Plan already in paket',
                    ]);
                }else {
                    $paketContainer = new PaketContainer;
                    $paketContainer->harga = $request->harga;
                    $paketContainer->paketID = $id;
                    $paketContainer->planID = $request->planID;
                }
            }else {
                return response()->json([
                    'status' => 404,
                    'message'=> 'Paket ID not found'
                ]);
            }
        }else {
            return response()->json([
                'status'=>401,
                'message'=> 'Please login first'
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
