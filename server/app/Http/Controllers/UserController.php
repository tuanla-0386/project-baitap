<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'success' => 'true',
            'users' => User::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // update email, name
        $user = DB::table('users')->where('id', $id)->get();

        if(count($user) === 0){
            return response()->json([
                'success' => 'false',
                'message' => 'user not found'
            ]);
        }

        $email = DB::table('users')->where('email', $request->email)->where('id', '!=', $id)->get();
        if(count($email)){
            return response()->json([
                'success' => 'false',
                'message' => 'email exist'
            ]);
        }

        DB::table('users')
                ->where('id', $id)
                ->update(['email' => $request->email, 'name' => $request->name, 'phone' => $request->phone, 'address' => $request->address, 'role' => $request->role]);
        return response()->json([
            'success' => 'true',
            'message' => 'update successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = DB::table('users')->where('id', $id)->get();

        if(count($user) === 0){
            return response()->json([
                'success' => 'false',
                'message' => 'user not found'
            ]);
        }

        DB::table('users')->where('id', $id)->delete();
        return response()->json([
            'success' => 'true',
            'message' => 'delete successfully'
        ]);
    }
}
