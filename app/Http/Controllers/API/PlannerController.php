<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\Planner;

class PlannerController extends Controller
{
    public function createPlanner(){
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
            $planner = new Planner;
            $plan->nama = $request->nama;
            $plan->start_at = $request->start_at;
            $plan->end_at = $request->end_at;
            $plan->total_wisata = 0;
            
            return response()->json([
                'status'=>200,
                'message'=>'Data has been added successfully',
            ]);
        }
    }
}
