import {Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2} from '@angular/core';
import {Vector} from '../../../core/types/vector';

@Directive({
  selector: '[appDragImage]'
})
export class DragImageDirective {

  @Output() newPositionEvent: EventEmitter<Vector> = new EventEmitter<Vector>();

  private xPosition: number;
  private yPosition: number;

  private imageLeft: number;
  private imageTop: number;

  private mouseIsDown = false;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef) {
  }

  /*
    @HostListener('click')
    setSize(): void {

      const image = this.el.nativeElement;
      const imageLeft = image.offsetLeft;
      const imageTop = image.offsetTop;

      const top = imageTop + 10;
      const left = imageLeft + 10;


      this.renderer.setStyle(image, 'top', `${top}px`);
      this.renderer.setStyle(image, 'left', `${left}px`);
      console.log('clicke in direc');
      this.newPositionEvent.emit(new Vector(left, top));
    }
  */
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.mouseIsDown = true;
    this.xPosition = event.x;
    this.yPosition = event.y;

    const image = this.el.nativeElement;
    this.imageLeft = image.offsetLeft;
    this.imageTop = image.offsetTop;
  }


  @HostListener('mousemove', ['$event'])
  private onMouseMove(event: MouseEvent): void {
    if (this.mouseIsDown === true) {

      const image = this.el.nativeElement;
      const container = image.parentNode;
      const leftover = this.maxMovablePixels(image, container);

      const diffX = event.x - this.xPosition;
      const diffY = event.y - this.yPosition;

      let left = this.imageLeft + diffX;
      let top = this.imageTop + diffY;

      if (left > 0) {
        left = 0;
      } else if (left < -leftover.x) {
        left = -leftover.x;
      }
      if (top > 0) {
        top = 0;
      } else if (top < -leftover.y) {
        top = -leftover.y;
      }
      console.log('x = ' + leftover.x);
      console.log('y = ' + leftover.y);
      this.renderer.setStyle(image, 'top', `${top}px`);
      this.renderer.setStyle(image, 'left', `${left}px`);

      this.newPositionEvent.emit(new Vector(left, top));
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.mouseIsDown = false;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent): void {
    this.mouseIsDown = false;
  }

  private maxMovablePixels(image: any, container: any): Vector {
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const imageWidth = image.offsetWidth;
    const imageHeight = image.offsetHeight;

    if ((imageWidth - containerWidth) > (imageHeight - containerHeight)) {
      const leftoverX = (containerHeight * imageWidth / imageHeight) - containerWidth;
      return new Vector(leftoverX, 0);
    } else {
      const leftoverY = (containerWidth * imageHeight  / imageWidth) - containerHeight;
      return new Vector(0, leftoverY);
    }
  }
}
