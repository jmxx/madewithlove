import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';
import { Observable } from 'rxjs/Rx';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private _config: any   = null;
  private _user: any     = null;

  constructor(public router: Router, @Inject(Http) public http: Http) {

  }

  config(config: any) {
    this._config = config;
  }

  check(callback?: any) {
    return this.http.get('/me')
      .map((res: Response) => res.json()).subscribe((data: any) => {
        if (data.status) {
          this._user = data.user;

          return callback(this._user);
        }
        return callback(false);
      });
  }

  login(creds: any) {
    let headers = new Headers({
      'Accept'        : 'application/json',
      'Content-Type'  : 'application/json',
      'X-CSRF-TOKEN'  :  this.getToken()
    });
    
    let observable = this.http.post('/login', JSON.stringify(creds), {headers: headers})
      .map((res: Response) => res.json())
      // .catch((res: Response) => {
      //   console.log('catch', res);
      //
      //   return Observable.throw(res.json());
      // })
      .share();

    observable.subscribe((data: any) => {
      if (data.status === 'success') {

      }
    }, (err) => {
      console.log(err.json())
    }, () => {
      console.log('Authentication Complete')
    });

    return observable;
  }

  // logout() {
  //   // return this.http.get('/logout').map((res: Response) => res.json()).subscribe((data: any) => {
  //   //   if (data.status === 'success') {
  //   //
  //   //   }
  //   // });
  // }
  //
  redirectTo(route: any) {
    let url = this._config.redirects[route];
    this.router.navigate([url]);
  }

  getToken() {
    let token: any = document.querySelector('meta[property="csrf-token"]');

    return token.content;
  }
}