<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call(ZonesSeeder::class);
        $this->call(UsersSeeder::class);
        $this->call(Products::class);
    
        /*php artisan migrate:fresh --seed */
    }
}
