<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;/*conexión */
use App\Models\Zone;

class ZonesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("zones")->insert([
            'name'=>'Zona Noroeste',
            'description'=>'Chihuahua, Sonora y Bajas',
            'created_at'=>date('Y-m-d h:m:s')
        ]);
         DB::table("zones")->insert([
            'name'=>'Zona Sur',
            'description'=>'Yucatan, Oaxaca, Chiapas',
            'created_at'=>date('Y-m-d h:m:s')
        ]);
        $dato = new Zone();//insert into
        $dato->name ="Centro";
        $dato->description ="Comprede CDMX y Querétaro";
        $dato->save();
        


    }
}
