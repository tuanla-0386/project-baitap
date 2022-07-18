<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // create new user
        $newUser = new User;
        $newUser->name = $request->input('name');
        $newUser->email = $request->input('email');
        $newUser->password = Hash::make($request->input('password'));
        $newUser->phone = $request->input('phone');
        $newUser->address = $request->input('address');
        $newUser->role = 2; // default: staff
        $newUser->save();

        return response()->json([
            "message" => "Create new user successfully",
            "user" => $newUser
        ], 200);
    }

    public function login(Request $request)
    {
        if(!Auth::attempt($request->only('email', 'password')))
        {
            return response()->json([
                'message' => "Incorrect email or password"
            ], 400);
        }

        $user = Auth::user();
        $token = $user->createToken('token')->plainTextToken;
        return response()->json([
            'message' => "Login successfully",
            'token' => $token,
            'user' => $user
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => "Logout successfully",
        ], 200);
    }

    public function getCurrentUser(Request $request)
    {
        return response()->json([
            'user' => $request->user()
        ], 200);
    }
}
