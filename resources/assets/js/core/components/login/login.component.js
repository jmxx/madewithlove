import { Component } from '@angular/core';

import { MwlInputComponent } from '../../directives/mwl-input.directive';

import template from './login.template.html';

@Component({
  selector: 'login-form',
  template: template,
  directives: [MwlInputComponent]
})
export class LoginComponent {
  constructor() {
  }
}