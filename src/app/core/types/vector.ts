export class Vector {

  constructor(private _x: number, private _y: number) {
  }

  toCdkDragFreeDragPosition(): any {
    console.log('get fre drag pos *** x = ' + this._x + 'and y = ' + this._y);
    return {x: this._x, y: this._y};
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }
}
