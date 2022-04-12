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
            $validator = Validator::make($request->details, [
                'username'=> 'required|unique:users,username',
                'password'=>'required|min:8',
                'name'=>'required',
                'phoneNumber'=>'required',
            ]);
        }else {
            $validator = Validator::make($request->details, [
                'username'=> 'required|unique:users,username',
                'password'=>'required|min:8',
                'name'=>'required',
                'phoneNumber'=>'required',
                'location'=>'required',
            ]);
        }

        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }else{
            if ($role === 'user'){
                $user = User::create([
                    'username'=>$request->details['username'],
                    'password'=>Hash::make($request->details['password']),
                    'name'=>$request->details['name'],
                    'phoneNumber'=>$request->details['phoneNumber'],
                    'roleType'=>1
                ]);
            }else {
                $user = User::create([
                    'username'=>$request->details['username'],
                    'password'=>Hash::make($request->details['password']),
                    'name'=>$request->details['name'],
                    'phoneNumber'=>$request->details['phoneNumber'],
                    'location'=>$request->details['location'],
                    'roleType'=>2
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
                if($user->roleType == 0){
                    $token = $user->createToken($user->username.'_AdminToken', ['server:admin'])->plainTextToken;
                }else if ($user->roleType == 2){
                    $token = $user->createToken($user->username.'_AgencyToken', ['server:agency'])->plainTextToken;
                }else {
                    $token = $user->createToken($user->username.'_Token', ['server:user'])->plainTextToken;
                }

                return response()->json([
                    'status'=>200,
                    'username'=>$user->name,
                    'token'=>$token,
                    'message'=>'Signed in Successfully'
                ]);
            }
        }
    }

    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status'=> 200,
            'message'=>'Logout successfully',
        ]);
    }
}
