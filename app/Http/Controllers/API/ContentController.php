<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Pariwisata;
use App\Models\Kategori;
use App\Models\Paket;
use App\Models\Planner;

use App\Models\PlannerContainer;

class ContentController extends Controller
{
    public function showPariwisata(){
        $pariwisata = Pariwisata::all();
        return response()->json([
            'status'=>200,
            'pariwisata' => $pariwisata,
        ]);
    }

    public function showPlanner(){
        if (auth('sanctum')->check()){
            $user_id = auth('sanctum')->user();
            // $plannerList = Planner::where('userID', $user_id)->get();
            $plannerList = Planner::all();
            return response()->json([
                'status' => 200,
                'planner' => $plannerList,
                'user_id' => $user_id
            ]);
        }else {
            return response()->json([
                'status' => 401,
                'message' => 'Please login first',
            ]);
        }
        
    }

    public function showPaket(){
        if (auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;
            if ($user_id == 1) {
                $paket = Paket::all();
                return response()->json([
                    'status'=>200,
                    'paket' => $paket,
                ]);
            }else if ($user_id == 2){
                $paket = Paket::where('userID', $user_id)->get();
                return response()->json([
                    'status' => 200,
                    'paket' => $paket,
                ]);
            }else {
                return response()->json([
                    'status' => 401,
                    'message' => 'Access Denied',
                ]);
            }
        }else {
            return response()->json([
                'status' => 401,
                'message' => 'Please login first',
            ]);
        }
        
    }

    public function showKategori(){
        $kategori = Kategori::all();
        return response()->json([
            'status'=>200,
            'kategori' => $kategori,
        ]);
    }

    public function searchPariwisata($lokasi){
        $pariwisata = Pariwisata::whereRaw("lokasi REGEXP '" . $lokasi . "'")
                                ->orWhereRaw("nama REGEXP '".$lokasi."'")->get();
        return response()->json([
            'status'=>200,
            'pariwisata' => $pariwisata,
        ]);
    }

    public function getPariwisataByID($id){
        $pariwisata = Pariwisata::find($id);
        return response()->json([
            'status'=>200,
            'pariwisata' => $pariwisata,
        ]);
    }
    public function getPlannerByID($id){
        if(auth('sanctum')->check()){
            $planner = Planner::find($id);
            $plannerContainer = PlannerContainer::where('planID', $id);
            return response()->json([
                'status'=>200,
                'planner' => $planner,
                'plannerContainer' => $plannerContainer,
            ]);
        }else {
            return response()->json([
                'status'=>401,
                'message' => 'Please login first',
            ]);
        }
        
    }

    public function getPaketByID($id){
        $paket = Paket::find($id);
        return response()->json([
            'status'=>200,
            'paket' => $paket,
        ]);
    }
}
