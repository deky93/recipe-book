import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

  //this allows you to get information about the place you use that directive
  constructor(public viewContainerRef: ViewContainerRef) { }

}
