<?php namespace Mwl\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use Tymon\JWTAuth\Facades\JWTAuth;

use Mwl\Http\Requests;
use Mwl\Http\Controllers\Api\ApiBaseController;


class SessionsController extends ApiBaseController
{
  public function __construct(Guard $auth)
  {
    $this->auth = $auth;
  }

  public function index()
  {
    return [
      'user' => $this->auth->user()
    ];
  }

  public function store(Request $request)
  {
    $credentials = $request->only('username', 'password');

    return $this->requestToken($credentials);
  }

  protected function requestToken(array $credentials)
  {
    try {
      if (! $token = JWTAuth::attempt($credentials)) {
        return response()->json([
          'status'  => 'error',
          'message' => 'Invalid Credentials'
        ]);
      }

      return response()->json([
        'status' => 'success',
        //'token'  => $token
      ])->withCookie('jwt_token', $token, 120, null, null, false, true);
    } catch (JWTException $e) {
      return response()->json([
        'status'  => 'error',
        'message' => 'Could not create token'
      ]);
    }
  }
}
