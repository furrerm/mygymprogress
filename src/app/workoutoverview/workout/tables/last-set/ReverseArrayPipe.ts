import {Pipe, PipeTransform} from '@angular/core';
import {SetContainer} from '../../saved-workouts.Workout';

@Pipe({ name: 'reverse' })

export class ReverseArrayPipe implements PipeTransform {
  transform(value): SetContainer[] {
    const setContainer: SetContainer[] = value.slice(0, value.length).reverse();
    return setContainer;
  }
}
