<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request){
        $role = $request->role;
        if ($role === 'user'){
            $validator = Validator::make($request->all(), [
                'username'=> 'required|unique:users,username',
                'password'=>'required|min:8',
                'name'=>'required',
                'phoneNumber'=>'required',
            ]);
        }else {
            $validator = Validator::make($request->all(), [
                'username'=> 'required|unique:users,username',
                'password'=>'required|min:8',
                'name'=>'required',
                'phoneNumber'=>'required',
                'Location'=>'required',
            ]);
        }

        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }else{
            if ($role === 'user'){
                $user = User::create([
                    'username'=>$request->username,
                    'password'=>Hash::make($request->password),
                    'name'=>$request->name,
                    'phoneNumber'=>$request->phoneNumber,
                ]);
            }else {
                $user = User::create([
                    'username'=>$request->username,
                    'password'=>Hash::make($request->password),
                    'name'=>$request->name,
                    'phoneNumber'=>$request->phoneNumber,
                    'location'=>$request->location
                ]);
            }
            $token = $user->createToken($user->username.'_Token')->plainTextToken;

            return response()->json([
                'status'=>200,
                'username'=>$user->name,
                'token'=>$token,
                'message'=>'Registered Successfully',
            ]);
        }
    }
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'username' =>'required',
            'password'=>'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }else {
            $user = User::where('username', $request->username)->first();

            if (! $user || ! Hash::check($request->password, $user->password)){
                return response()->json([
                    'status'=>401,
                    'message'=>'Invalid credentials',
                ]);
            }else{
                $token = $user->createToken($user->username.'_Token')->plainTextToken;

                return response()->json([
                    'status'=>200,
                    'username'=>$user->name,
                    'token'=>$token,
                    'message'=>'Registered Successfully',
                ]);
            }
        }
    }
}
