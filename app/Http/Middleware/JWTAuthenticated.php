<?php namespace Mwl\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Middleware\BaseMiddleware;

class JWTAuthenticated extends BaseMiddleware
{
  /**
   * Check to see if there is a valid JWT token.
   *
   * @param  Request  $request
   * @param  Closure  $next
   * @return mixed
   */
  public function handle(Request $request, Closure $next)
  {
    // dd(JWTAuth::parseToken());
    if (!($token = $request->cookie('jwt_token'))) {
      return response()->json([
        'status' => 'error',
        'message' => 'Token is missing'
      ], 400);
    }

    try {
      $user = $this->auth->authenticate($token);
    } catch (TokenExpiredException $e) {
      return response()->json([
        'status' => 'error',
        'message' => 'Token expired'
      ], $e->getStatusCode());
    } catch (TokenInvalidException $e) {
      return response()->json([
        'status' => 'error',
        'message' => 'Invalid token'
      ], $e->getStatusCode());
    } catch (JWTException $e) {
      return response()->json([
        'status' => 'error',
        'message' => 'Token is missing'
      ], $e->getStatusCode());
    }

    if (! $user) {
      return response()->json([
        'status' => 'error',
        'message' => 'User not found'
      ], $e->getStatusCode());
    }

    return $next($request);
  }
}
