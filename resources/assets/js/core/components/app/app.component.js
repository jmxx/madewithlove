import { Component } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { LoginComponent } from '../login/login.component';

import template from './app.template.html';

@Component({
  selector: 'mwl-app',
  template: template,
  directives: [ ROUTER_DIRECTIVES ],
  host: {
    '[class.is-home]':  'classes.isHome'
  }
})
@Routes([
  { path: '/login',     name: 'Login',    component: LoginComponent }
])
export class MwlApp {
  router        = null;
  classes       = {
   isHome   : true
  };

  constructor(router: Router) {
    this.router = router;

    this.router.changes.subscribe((path) => {
      let hash = router._location.platformStrategy._platformLocation._location.hash;

      // If hash is empty (Index)
      this.classes.isHome = hash === '';
    }, (error) => {
      console.log(error);
    });
  }
}
