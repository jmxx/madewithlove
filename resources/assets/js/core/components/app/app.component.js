import { Component } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { LoginComponent } from '../login/login.component';

import template from './app.template.html';

@Component({
  selector: 'mwl-app',
  template: template,
  directives: [ ROUTER_DIRECTIVES ]
})
@Routes([
  {path: '/login', component: LoginComponent}
])
export class MwlApp {
  constructor() {
  }
}
