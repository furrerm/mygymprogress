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
  setSize() {
    const node = this.el.nativeElement;
    const parentNode = this.el.nativeElement.parentNode;
    const parentNodeWidth = parentNode.offsetWidth;
    const parentNodeHeight = parentNode.offsetHeight;
    this.renderer.setStyle(node, 'width', '500px');
    if (node.offsetWidth < parentNodeWidth || node.offsetHeight < parentNodeHeight) {
      this.renderer.setStyle(node, 'min-width', '100%');
      this.renderer.setStyle(node, 'min-height', '100%');
    } else {
      // todo: check how image scales and use trigonometric functions instead
      if (node.offsetWidth - parentNodeWidth < node.offsetHeight - parentNodeHeight) {
        this.renderer.setStyle(node, 'max-width', '100%');
      } else {
        this.renderer.setStyle(node, 'max-height', '100%');
      }
    }
  }
}
