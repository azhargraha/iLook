<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Rating;
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
        // if (auth('sanctum')->check()){
        //     $user_id = auth('sanctum')->user()->id;
        //     if ($user_id == 1) {
        //         $paket = Paket::all();
        //         return response()->json([
        //             'status'=>200,
        //             'paket' => $paket,
        //         ]);
        //     }else if ($user_id == 2){
        //         $paket = Paket::where('userID', $user_id)->get();
        //         return response()->json([
        //             'status' => 200,
        //             'paket' => $paket,
        //         ]);
        //     }else {
        //         return response()->json([
        //             'status' => 401,
        //             'message' => 'Access Denied',
        //         ]);
        //     }
        // }else {
        //     return response()->json([
        //         'status' => 401,
        //         'message' => 'Please login first',
        //     ]);
        // }
        $paket = Paket::all();
        return response()->json($paket, 200);
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
        $rating = Rating::where('wisataID', $id)->pluck('rating')->avg();    
        $ratingCount = Rating::where('wisataID', $id)->get()->count();   
        $fiveStar = Rating::where('wisataID', $id)->where('rating', 5.0)->get()->count();
        $fourStar = Rating::where('wisataID', $id)->where('rating', 4.0)->get()->count();
        $threeStar = Rating::where('wisataID', $id)->where('rating', 3.0)->get()->count();
        $twoStar = Rating::where('wisataID', $id)->where('rating', 2.0)->get()->count();
        $oneStar = Rating::where('wisataID', $id)->where('rating', 1.0)->get()->count();
        return response()->json([
            'status'=>200,
            'pariwisata' => $pariwisata,
            'rating' => $rating,
            'totalRatingCount' => $ratingCount,
            'ratingDetails'=> [
                '5.0' => $fiveStar,
                '4.0' => $fourStar,
                '3.0' => $threeStar,
                '2.0' => $twoStar,
                '1.0' => $oneStar,
            ],
        ]);
    }
    
    public function sendRating(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'rating' =>'required',
        ]);
        if ($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->messages(),
            ], 401);
        }else {
            $rating = Rating::create([
                'rating' => $request->rating,
                'wisataID' => $id,
            ]);
            return response()->json($rating, 200);
        }
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
