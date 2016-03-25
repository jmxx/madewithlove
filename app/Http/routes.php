<?php

Route::group(['middleware' => ['web']], function () {
  Route::auth();

  Route::get('/', function () {
    return view('welcome');
  });

  Route::get('/home', 'HomeController@index');

  Route::get('/me', function () {
    return [
      'status' => !!auth()->user(),
      'user' => auth()->user()
    ];
  });

  Route::group(['prefix' => 'admin', 'namespace' => 'Admin'], function () {
    // Route::get('/', 'DashboardController@index');
    Route::get('/', 'AuthController@showLoginForm');
  });
});

Route::group(['prefix' => 'api', 'namespace' => 'Api'], function () {
  Route::resource('sessions', 'SessionsController');

  Route::resource('items', 'ItemsController');
});
