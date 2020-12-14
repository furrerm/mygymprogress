import {Pipe, PipeTransform} from '@angular/core';
import {ExerciseSetContainerDTO} from '../../../../common/model/swagger-model/exerciseSetContainerDTO';

@Pipe({ name: 'reverse' })

export class ReverseArrayPipe implements PipeTransform {
  transform(value): ExerciseSetContainerDTO[] {
    const setContainer: ExerciseSetContainerDTO[] = value.slice(0, value.length).reverse();
    return setContainer;
  }
}
