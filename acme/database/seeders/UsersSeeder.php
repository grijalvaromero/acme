<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;/*conexión */
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name'=>'Administrador 1',
            'email'=>'admin@yahoo.com',
            'password'=>Hash::make('123456'),
            'img'=>'default.jpg',
            'rol'=>1,
            'zone_id'=>2,
            'created_at'=>date('Y-m-d h:m:s')
        ]);
         DB::table('users')->insert([
            'name'=>'Arqui 1',
            'email'=>'arqui@yahoo.com',
            'password'=>Hash::make('123456'),
            'img'=>'default.jpg',
            'rol'=>2,
            'zone_id'=>2,
            'created_at'=>date('Y-m-d h:m:s')
        ]);
         DB::table('users')->insert([
            'name'=>'Cliente 1',
            'email'=>'c1@yahoo.com',
            'password'=>Hash::make('123456'),
            'img'=>'default.jpg',
            'rol'=>3,
            'zone_id'=>2,
            'created_at'=>date('Y-m-d h:m:s')
        ]);
    }
}
