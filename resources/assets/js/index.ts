/// <reference path="../../../typings/index.d.ts" />

import 'babel-polyfill';
import 'zone.js/dist/zone';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { FORM_PROVIDERS, LocationStrategy, HashLocationStrategy } from '@angular/common'

import { MwlApp } from './core/components/app/app.component';

bootstrap(MwlApp, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    FORM_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
]);
