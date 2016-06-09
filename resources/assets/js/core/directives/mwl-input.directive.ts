import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'mwl-input',
    template: require('./mwl-input.template.html')
})
export class MwlInputComponent {
    @ViewChild('input')   input:ElementRef;

    @Input() type         = 'text';
    @Input() id           = 'password';
    @Input() label        = 'Label';
    @Input() value        = '';

    @Output() valueChange = new EventEmitter();

    inputClasses          = {};

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    onChange($event) {
        this.inputClasses['mwl-not-empty'] = !! $event.target.value;
        this.valueChange.emit($event.target.value);
    }
}