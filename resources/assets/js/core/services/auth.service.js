import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  _config   = {};
  http      = null;
  user      = null;
  router    = null;

  constructor(router: Router, @Inject(Http) http: Http) {
    this.http = http;
    this.router = router;
  }

  config(config) {
    this._config = config;
  }

  check(callback = () => {}) {
    return this.http.get('/me').map(res => res.json()).subscribe(data => {
      if (data.status) {
        this.user = data.user;

        return callback(this.user);
      }

      return callback(false);
    });
  }

  login(creds) {
    let headers = new Headers({
      'Accept'        : 'application/json',
      'Content-Type'  : 'application/json',
      'X-CSRF-TOKEN'  :  this.getToken()
    });

    return this.http.post('/login', JSON.stringify(creds), {headers: headers}).map(res => res.json()).subscribe(data => {
      if (data.status === 'success') {

      }
    });
  }

  logout() {
    return this.http.get('/logout').map(res => res.json()).subscribe(data => {
      if (data.status === 'success') {

      }
    });
  }

  redirectTo(route) {
    let url = this._config.redirects[route];
    this.router.navigate([url]);
  }

  getToken() {
    let token = document.querySelector('meta[property="csrf-token"]');

    return token.content;
  }
}