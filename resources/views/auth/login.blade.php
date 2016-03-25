@extends('layout', [
  'bodyClass' => 'login-page'
])

@section('content')
  <div class="Login Section">
    <form class="Login Form h-Align" method="POST" action="{{ url('/login') }}">
      {!! csrf_field() !!}
      <div class="Form-control">
        <label for="email" class="Label">Username or Email Address</label>
        <input type="text" class="Input" name="email">
      </div>
      <div class="Form-control">
        <label class="Label">Password</label>
        <input type="password" class="Input" name="password">
      </div>
      {{ $errors->first('email') }}
        <div class="form-group">
            <div class="col-md-6 col-md-offset-4">
                <div class="checkbox">
                    <label>
                        <input type="checkbox" name="remember"> Remember Me
                    </label>
                </div>
            </div>
        </div>
      <div class="Form-control">
        <button type="submit" class="Button">
          Login
        </button>
      </div>
        <div class="form-group">
            <div class="col-md-6 col-md-offset-4">
                <button type="submit" class="btn btn-primary">
                    <i class="fa fa-btn fa-sign-in"></i>Login
                </button>

                <a class="btn btn-link" href="{{ url('/password/reset') }}">Forgot Your Password?</a>
            </div>
        </div>
    </form>
  </div>
@endsection
