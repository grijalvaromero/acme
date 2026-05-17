<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //$users = User::all();
        /**select * from users inner join zones on  */
        /*$users = User::select(['users.*',"zones.name as zone_name"])
        ->join('zones','users.zone_id','=','zones.id')
        ->orderBy('users.id',"DESC")
        ->get();*/
        $users = User::with(['zone'])->get();
        return response()->json([
            "data"=>$users,
            "status"=>"success"
        ],200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $valideted = $request->validate([
            'name'=>'required|min:3|max:30',
            'email'=>'required|email',
            'password'=>'required|min:4',
            'rol'=>'required|numeric',
            'zone'=>'required|numeric',
        ]);
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->rol =$request->rol;
        $user->img ='default.jpg';
        $user->zone_id =  $request->zone;
        $user->save();
        return response()->json([
            "data"=>$user,
            "status"=>"success"
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);
        if($user == null){
            return response()->json([
                "message"=>"Usuario no encontrado",
                "status"=>"error"
            ],404);
        }
        return response()->json([
            "data"=>$user,
            "status"=>"success"
        ],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        if($user == null){
            return response()->json([
                "error"=>"Usuario no encontrado",
                "status"=>"error"
            ],404);
        }
        $user->delete();
        return response()->json([
            "status"=>"success",
            "message"=>"Registro eliminado correctamente"
        ],204);
    }
}
