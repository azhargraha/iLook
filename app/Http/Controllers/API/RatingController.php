<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Rating;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class RatingController extends Controller
{
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

    public function getRating($id){
        $rating = Rating::where('wisataID', $id)->pluck('rating')->avg();
        return response()->json([
            'status'=>200,
            'rating' => $rating,
        ]);
    }

    public function getIndividualRating($id){
        $fiveStar = Rating::where('wisataID', $id)->where('rating', 5.0)->get()->count();
        $fourStar = Rating::where('wisataID', $id)->where('rating', 4.0)->get()->count();
        $threeStar = Rating::where('wisataID', $id)->where('rating', 3.0)->get()->count();
        $twoStar = Rating::where('wisataID', $id)->where('rating', 2.0)->get()->count();
        $oneStar = Rating::where('wisataID', $id)->where('rating', 1.0)->get()->count();
        return response()->json([
            'status'=>200,
            '5.0' => $fiveStar,
            '4.0' => $fourStar,
            '3.0' => $threeStar,
            '2.0' => $twoStar,
            '1.0' => $oneStar,
        ]);
    }
}
