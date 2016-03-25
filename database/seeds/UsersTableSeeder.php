<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Mwl\Models\User;

class UsersTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    Model::unguard();

    DB::table('users')->delete();

    User::create([
      'name'     => 'Juan Manuel Reynoso',
      'email'    => 'mue@mwl.mx',
      'username' => 'mue',
      'password' => bcrypt('navarone')
    ]);

    Model::reguard();
  }
}
