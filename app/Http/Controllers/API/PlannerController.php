<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\Planner;
use App\Models\PlannerContainer;

class PlannerController extends Controller
{
    public function createPlanner(Request $request){
        $validator = Validator::make($request->all(), [
            'nama'=> 'required',
            'start_at' => 'required|date',
            'end_at' => 'required|date|after_or_equal:start_date',
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>400,
                'validation_errors' => $validator->messages(),
            ]);
        }else{
            if(auth('sanctum')->check()){
                $planner = new Planner;
                // $planner->userID = auth('sanctum')->user()->id;
                $planner->nama = $request->nama;
                $planner->start_at = $request->start_at;
                $planner->end_at = $request->end_at;
                $planner->save();
                return response()->json([
                    'status' => 200,
                    'message'=> 'Planner created successfully'
                ]);

            }else {
                return response()->json([
                    'status'=>401,
                    'message'=> 'Please login first'
                ]);
            }
        }
    }

    public function addToPlanner(Request $request, $id){
        if(auth('sanctum')->check()){
            $planner = Planner::find($id);
            if($planner){
                $validator = Validator::make($request->all(), [
                    'wisataID'=> 'required',
                    'date' => 'required|date_format:m/d/Y',
                    'hour_start'=>'required|date_format:H:i',
                    'hour_end'=>'required|date_format:H:i|after:hour_start',
                ]);
                if(PlannerContainer::where('planID', $id)->where('wisataID', $request->wisataID)->exists()){
                    return response()->json([
                        'status' => 400,
                        'message'=> 'Wisata already in planner',
                    ]);
                }else {
                    $plannerContainer = new PlannerContainer;
                    $plannerContainer->planID = $id;
                    $plannerContainer->date = $request->date;
                    $plannerContainer->hour_start = $request->hour_start;
                    $plannerContainer->hour_end = $request->hour_end;
                    $plannerContainer->wisataID = $request->wisataID;
                    $plannerContainer->save();
                    return response()->json([
                        'status' => 200,
                        'message' => 'Wisata added to planner',
                    ]);
                }
            }else {
                return response()->json([
                    'status' => 404,
                    'message'=> 'Planner ID not found'
                ]);
            }
            

        }else {
            return response()->json([
                'status'=>401,
                'message'=> 'Please login first'
            ]);
        }
    }

    public function delete($id){
        if(auth('sanctum')->check()){
            $planner = Planner::find($id);
            if($planner){
                $planner->delete();
                // if (PlannerContainer::where('planID', $id)->exists()){
                //     PlannerContainer::where('planID', $id)->delete();
                // }
                return response()->json([
                    'status'=>200,
                    'message'=>'Data pariwisata has been deleted',
                ]);
            }else {
                return response()->json([
                    'status'=>404,
                    'message'=>'No Plan ID Found',
                ]);
            }
        }else {
            return response()->json([
                'status'=>401,
                'message'=> 'Please login first'
            ]);
        }
    }
}
