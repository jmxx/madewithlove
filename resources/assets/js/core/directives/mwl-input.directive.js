import { Component, Input, ElementRef, ViewChild } from '@angular/core';

import template from './mwl-input.template.html';

@Component({
  selector: 'mwl-input',
  template: template
})
export class MwlInputComponent {
  @ViewChild('input')   input:ElementRef;

  @Input() type         = 'text';
  @Input() id           = 'password';
  @Input() label        = 'Label';
  @Input() value        = '';

  inputClasses          = {};

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  onChange($event) {
    this.inputClasses['mwl-not-empty'] = !! $event.target.value;
  }
}