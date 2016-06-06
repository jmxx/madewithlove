import { Component, Inject } from '@angular/core';

import { AuthService } from '../../services/auth.service';

import { MwlInputComponent } from '../../directives/mwl-input.directive';

import template from './login.template.html';

@Component({
  selector: 'login-form',
  template: template,
  directives: [
    MwlInputComponent
  ]
})
export class LoginComponent {
  auth    = null;
  creds   = {
    username : '',
    password : ''
  };

  constructor(@Inject(AuthService) auth: AuthService) {
    this.auth = auth;
  }

  onSubmit($event) {
    $event.preventDefault();

    this.auth.login(this.creds);
  }
}