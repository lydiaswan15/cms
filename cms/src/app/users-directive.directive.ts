import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUsersDirective]'
})
export class UsersDirectiveDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }

}
