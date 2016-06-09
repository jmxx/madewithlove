import {Component, Inject} from '@angular/core';

import {AuthService} from '../../services/auth.service';

import {MwlInputComponent} from '../../directives/mwl-input.directive';

@Component({
  selector: 'login-form',
  template: require('./login.template.html'),
  directives: [
    MwlInputComponent
  ]
})
export class LoginComponent {
  private auth:AuthService = null;
  creds = {
    username: '',
    password: ''
  };

  constructor(@Inject(AuthService) auth:AuthService) {
    this.auth = auth;
  }

  onSubmit($event) {
    $event.preventDefault();

    this.auth.login(this.creds).subscribe((data: any) => {
      if (data.status === 'success') {

      }
    }, (err) => {
      console.log(err.json())
    }/*, () => {
      console.log('Authentication Complete')
    }*/);
  }
}