import { Component, Input, Output, Provider, EventEmitter, ElementRef, forwardRef, ViewChild } from '@angular/core';
import { Control, ControlValueAccessor, CORE_DIRECTIVES, NG_VALUE_ACCESSOR } from '@angular/common';

@Component({
  selector: 'mwl-input',
  template: require('./mwl-input.template.html'),
  providers: [
    new Provider(NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => MwlInputComponent), multi: true}),
  ],
  directives: [ CORE_DIRECTIVES ]
})
export class MwlInputComponent implements  ControlValueAccessor {
  @ViewChild('input')   input:ElementRef;

  @Input() type                     = 'text';
  @Input() id                       = 'password';
  @Input() label                    = 'Label';
  @Input() value                    = '';
  @Input() ngFormControl: Control;

  @Output() valueChange = new EventEmitter();

  inputClasses          = {};

  private _onChangeCallback: (_:any) => void = (_) => {};
  private _onTouchedCallback: () => void = () => {};

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  setValue(value) {
    this.value = value;

    this.inputClasses['mwl-not-empty'] = !! value;

    this._onChangeCallback(value);
    this.valueChange.emit(value);
  }

  onKeyup($event) {
    this.setValue($event.target.value);
  }

  onChange($event) {
    this.setValue($event.target.value);
  }

  onTouched() {
    this._onTouchedCallback();
  };

  writeValue(value: any): void {
    this.setValue(value);
  }

  registerOnChange(fn: (_: any) => void): void { this._onChangeCallback = fn; }
  registerOnTouched(fn: () => void): void { this._onTouchedCallback = fn; }

  get errorMessage() {
    // Find the control in the Host (Parent) form
    // let c = this._formDir.form.find(this.controlName);
    let errors = this.ngFormControl.errors;

    // console.log(errors, this.ngFormControl);

    for (let propertyName in errors) {
      // If control has a error
      if (errors.hasOwnProperty(propertyName) && this.ngFormControl.touched) {
        // Return the appropriate error message from the Validation Service
        // return ValidationService.getValidatorErrorMessage(propertyName);
        return propertyName;
      }
    }

    return null;
  }
}
