// variablesGlobales.ts
import { Injectable } from '@angular/core';
@Injectable()
export class VariablesGlobales {
    isLoggedIn:any = localStorage.getItem('user');
    cards = [];
}