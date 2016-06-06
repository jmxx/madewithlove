<?php namespace Mwl\Http\Controllers\Auth;

use Validator;
use JWTAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

use Mwl\Http\Controllers\Controller;
use Mwl\Models\User;

class AuthController extends Controller
{
  /*
  |--------------------------------------------------------------------------
  | Registration & Login Controller
  |--------------------------------------------------------------------------
  |
  | This controller handles the registration of new users, as well as the
  | authentication of existing users. By default, this controller uses
  | a simple trait to add these behaviors. Why don't you explore it?
  |
  */
  use AuthenticatesAndRegistersUsers;//, ThrottlesLogins;

  /**
   * Where to redirect users after login / registration.
   *
   * @var string
   */
  protected $redirectTo = '/';

  protected $username = 'username';

  /**
   * Create a new authentication controller instance.
   *
   * @return void
   */
  public function __construct()
  {
    // $this->middleware('guest', ['except' => 'logout']);
  }

  public function login(Request $request)
  {
    $this->validate($request, [
      $this->loginUsername() => 'required', 'password' => 'required',
    ]);

    // If the class is using the ThrottlesLogins trait, we can automatically throttle
    // the login attempts for this application. We'll key this by the username and
    // the IP address of the client making these requests into this application.
    $throttles = $this->isUsingThrottlesLoginsTrait();
    if ($throttles && $this->hasTooManyLoginAttempts($request)) {
      return $this->sendLockoutResponse($request);
    }

    $credentials = $this->getCredentials($request);
    if (Auth::attempt($credentials, $request->has('remember'))) {
      return $this->handleUserWasAuthenticated($request, $throttles);
    }
    // If the login attempt was unsuccessful we will increment the number of attempts
    // to login and redirect the user back to the login form. Of course, when this
    // user surpasses their maximum number of attempts they will get locked out.
    if ($throttles) {
      $this->incrementLoginAttempts($request);
    }

    if ($request->ajax() || $request->wantsJson()) {
      return response()->json([
        'status' => 'error',
        'message' => $this->getFailedLoginMessage()
      ], 400);
    }

    return redirect()->back()
      ->withInput($request->only($this->loginUsername(), 'remember'))
      ->withErrors([
        $this->loginUsername() => $this->getFailedLoginMessage(),
      ]);
  }

  public function authenticated(Request $request, User $user)
  {
    if ($request->ajax() || $request->wantsJson()) {
      $token = JWTAuth::fromUser($user);
      return response()->json([
        'status'   => 'success',
        // 'redirect' => $this->redirectPath(),
        // 'token'    => JWTAuth::fromUser($user)
      ])->withCookie('jwt_token', $token, 120, null, null, false, true);
    }

    return redirect()->intended($this->redirectPath());
  }

  public function logout(Request $request)
  {
    Auth::guard($this->getGuard())->logout();

    if ($request->ajax() || $request->wantsJson()) {
      return response()->json([
        'status'   => 'success',
      ])->withCookie(cookie()->forget('jwt_token'));
    }

    return redirect('/');
  }

}
