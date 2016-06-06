import { Component, Inject } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { LoginComponent } from '../login/login.component';

import template from './app.template.html';

@Component({
  selector: 'mwl-app',
  template: template,
  directives: [ ROUTER_DIRECTIVES ],
  providers: [ AuthService ],
  host: {
    '[class.is-home]':  'classes.isHome'
  }
})
@Routes([
  { path: '/login',     name: 'Login',    component: LoginComponent }
])
export class MwlApp {
  auth          = null;
  router        = null;

  classes       = {
   isHome   : true
  };

  constructor(router: Router, @Inject(AuthService) auth: AuthService) {
    this.auth = auth;
    this.router = router;

    this.router.changes.subscribe(path => {
      let hash = router._location.platformStrategy._platformLocation._location.hash;

      // If hash is empty (Index)
      this.classes.isHome = hash === '';
    }, (error) => {
      console.log(error);
    });

    this.config();
  }

  ngOnInit() {
    this.auth.check(user => {
      if (!user) {
        return this.auth.redirectTo('login');
      }
      
      return this.auth.redirectTo('home');
    });
  }

  config() {
    this.auth.config({
      redirects: {
        login: '/login',
        home: '/'
      }
    });
  }
}
