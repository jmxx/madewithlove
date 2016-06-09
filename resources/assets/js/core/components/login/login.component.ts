import { Component, Inject }            from '@angular/core';
import { FORM_DIRECTIVES, FORM_PROVIDERS, FormBuilder, ControlGroup, Validators } from '@angular/common';

import { AuthService }                  from '../../services/auth.service';
import { MwlInputComponent }            from '../../directives/mwl-input.directive';

@Component({
  selector: 'login-form',
  template: require('./login.template.html'),
  providers: [ FORM_PROVIDERS ],
  directives: [
    MwlInputComponent, FORM_DIRECTIVES
  ]
})
export class LoginComponent {
  private loginForm: ControlGroup;

  creds = {
    username: '',
    password: ''
  };

  constructor(@Inject(AuthService) private auth:AuthService, private builder: FormBuilder) {
    this.loginForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
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
