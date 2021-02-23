import {Directive, ElementRef, HostListener, Input, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[appSetImageSize]'
})


export class SetImageSizeDirective {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef) {
  }

  @HostListener('load')
  setSize(): void {
    const node = this.el.nativeElement;
    const parentNode = this.el.nativeElement.parentNode;
    const parentNodeWidth = parentNode.offsetWidth;
    const parentNodeHeight = parentNode.offsetHeight;

    if (node.offsetWidth < parentNodeWidth - 2) {
      this.renderer.removeClass(this.el.nativeElement, 'file-input-image-landscape');
      this.renderer.addClass(this.el.nativeElement, 'file-input-image-portrait');
    }
  }
}
