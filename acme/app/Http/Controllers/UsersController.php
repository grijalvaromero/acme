<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Zone;

use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function index () {
        //query paara seleccionar los usuarios
        $datos  = User::all(); //select * from usuarios
        $zones = Zone::all();

        //dd($datos);
        return view('dash.users')
        ->with('users',$datos)
        ->with('zones',$zones);
    }
    public function store(Request $request){
       // dd($request->name);
       //reglas de validación
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
       return back()
        ->with('success',"Datos guardados correctamente");
       

    }

}
