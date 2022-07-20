<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getAllUser() {
        $users = User::all();

        return response()->json([
            'success' => 'true',
            'users' => $users
        ]);
    }

    public function edit() {
        
    }

    public function update() {

    }


}
