import { Component, Input } from '@angular/core';

import template from './mwl-input.template.html';

@Component({
  selector: 'mwl-input',
  template: template
})
export class MwlInputComponent {
  @Input() type   = 'text';
  @Input() id     = 'password';
  @Input() label  = 'Label';
  @Input() value  = '';

  inputClasses    = '';

  constructor() {

  }
}