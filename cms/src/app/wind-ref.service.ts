import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindRefService{

  constructor() { }

  getNativeWindow() {
    return window;
 }
}
