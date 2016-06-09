import {Component, Inject} from '@angular/core';
import {Location} from '@angular/common';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';

import {AuthService} from '../../services/auth.service';

import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'mwl-app',
  template: require('./app.template.html'),
  directives: [ROUTER_DIRECTIVES],
  providers: [AuthService],
  host: {
    '[class.is-home]': 'classes.isHome'
  }
})
@Routes([
  {path: '/login', component: LoginComponent}
])
export class MwlApp {
  private location:Location = null;
  private router:Router = null;
  private auth:AuthService = null;

  classes = {
    isHome: true
  };

  constructor(location:Location, router:Router, @Inject(AuthService) auth:AuthService) {
    this.location = location;
    this.auth = auth;
    this.router = router;

    this.router.changes.subscribe(() => {
      // If hash is empty (Index)
      this.classes.isHome = this.location.path() === '';
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