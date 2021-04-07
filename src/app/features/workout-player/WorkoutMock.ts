import {Day} from '../../core/model/internal-model/day.model';
import {Phase} from '../../core/model/internal-model/phase.model';
import {Exercise} from '../../core/model/internal-model/exercise.model';
import {ExerciseSetContainerDTO} from '../../core/model/swagger-model/exerciseSetContainerDTO';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ExerciseSetDTO} from '../../core/model/swagger-model/exerciseSetDTO';
import {NamedNumber} from '../../core/model/internal-model/NamedNumber';

export class WorkoutMock {

  constructor(private sanitizer: DomSanitizer) {
  }

  private exerciseSet: ExerciseSetDTO = {
    id: 1,
    weight: 35,
    repetitions: 12
};

  private _setsContainer: ExerciseSetContainerDTO = {
    timeOfExercise: new Date(),
    exerciseSets: [this.exerciseSet, this.exerciseSet]
  };

  private muscleTargets: NamedNumber[] = [{name: 'Chest', value: 70}, {name: 'Biceps', value: 20}, {name: 'Triceps', value: 10}];
  private stretchingTargets: NamedNumber[] = [{name: 'Leg', value: 40}, {name: 'Arm', value: 35}, {name: 'Back', value: 25}];

  private _exercise1: Exercise = {
    id: 1,
    name: 'squats',
    setsContainer: [this._setsContainer, this._setsContainer],
    order: 1,
    videoUrl: 'www.url.com',
    image: this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAyADIDASIAAhEBAxEB/8QAHAAAAgIDAQEAAAAAAAAAAAAAAAYDBAEFBwII/8QAMBAAAQQBAwIFAgQHAAAAAAAAAQIDBBEABRIhBjEHE0FRYSJxFBeB0SYyVpGSosH/xAAXAQEBAQEAAAAAAAAAAAAAAAADAgAB/8QAIhEAAgICAgICAwAAAAAAAAAAAAECEQMSITFBcWGBobHw/9oADAMBAAIRAxEAPwD6nSFbiSqwew9syT80PfKGuOSUaVNMNYZkJbJbcUNwB969a9vXFXSZeszEtvSJLTkRxKVUACrceFJ9AAkg+hJv0rOpWHPJq6G92ew1wCVn2Tmod6lQ5JESC22uSolKS66EpJHevVVetD9cnhMh2YQQChJJIxO17oRqf1PB1iWhMcafKDsbyaBITyEk+iTZJGHkTtRXnsTFJaynLx0josRMjyGjKWjzQn6wgfST8ZNd2EkccH4xai6iETFsof3OoAWpu7pN1z7dsZUgAWkAXz98vXXgmM97YVhmcMxRWnpK2DtslPNZopAXYAQrmroHGXgDF19fmPLWBtBN1eVEHKvJQldY6F09qZiaxNEZ91HmJ3NqI22RyQDXIPfJWteZ1uQ25pkhD+mlG7cEkWrdQ7gEdjnHvEjR5+teIDrEVh0gREqSooO2koKjR+/H3OOng8mY70ptlocS4JCwjzU7TtpNd/TuMueNUmn7Dx5XzFr1/fog8NdGfia5rWoz9TnP/i3ynyH/AORI3btw5skA7fis6+gUCd24E2PgZrI0Have+EKoUB3rJVyPw8qLGS2PLcv17ZMnsxMUdFyX9w+cMzhkDFLV1uN6e8poWvaaGI2gTdZlK0YTohT5+nl2WUtbQ3I3J+jua4J457d8vDxU6JWD/EEJTdcEbiD/AK5U1DxM6IXAkx43VMKC860pDbyEnc0SCAoApokHn9MtOuKCnDZ3ZtdHiuS9S1NwONjYtLI+qz9I57fJ/vmNNYksydQYaDa1syLKb5CFUbrvyLr5xR6H6r8NukNMdiwuqoz70hzzpMh91alvOEUVGxxfsPc5Va6l6Aj9fK6og9bMxXJCC3OhhaltSqTSFGx9JTweP+myji1a56v8jSybJqu0l6o6c9IejRlOBtVChSwayvHVLlalGVIQWwAop+mqFcn78jvmjd8Vug3QEOdR6ctHBNqV3BBHp7jJR4r9DEWOpIJHawVftifQevyPAFAC7wxG/NroT+ptP/yV+2Gcpl2fG0XVdRjxm2mJ8tppIoIQ8pIA79gcqTpUiUptUl914pTQLiyqh34vDDFDK1n3ws++GGdOBZ989ocWmwlagPg4YZjHiz74YYZjH//Z'),
    userEntryRequired: true,
    timeLength: 20,
    timeBased: false,
    weight: true,
    videoSrc: null,
    muscleTarget: this.muscleTargets,
    stretchingTarget: this.stretchingTargets
  };
  private _exercise2: Exercise = {
    id: 2,
    name: 'push ups',
    setsContainer: [this._setsContainer, this._setsContainer],
    order: 2,
    videoUrl: 'www.url.com',
    image: this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAyADIDASIAAhEBAxEB/8QAHAAAAgIDAQEAAAAAAAAAAAAAAAYDBAEFBwII/8QAMBAAAQQBAwIFAgQHAAAAAAAAAQIDBBEABRIhBjEHE0FRYSJxFBeB0SYyVpGSosH/xAAXAQEBAQEAAAAAAAAAAAAAAAADAgAB/8QAIhEAAgICAgICAwAAAAAAAAAAAAECEQMSITFBcWGBobHw/9oADAMBAAIRAxEAPwD6nSFbiSqwew9syT80PfKGuOSUaVNMNYZkJbJbcUNwB969a9vXFXSZeszEtvSJLTkRxKVUACrceFJ9AAkg+hJv0rOpWHPJq6G92ew1wCVn2Tmod6lQ5JESC22uSolKS66EpJHevVVetD9cnhMh2YQQChJJIxO17oRqf1PB1iWhMcafKDsbyaBITyEk+iTZJGHkTtRXnsTFJaynLx0josRMjyGjKWjzQn6wgfST8ZNd2EkccH4xai6iETFsof3OoAWpu7pN1z7dsZUgAWkAXz98vXXgmM97YVhmcMxRWnpK2DtslPNZopAXYAQrmroHGXgDF19fmPLWBtBN1eVEHKvJQldY6F09qZiaxNEZ91HmJ3NqI22RyQDXIPfJWteZ1uQ25pkhD+mlG7cEkWrdQ7gEdjnHvEjR5+teIDrEVh0gREqSooO2koKjR+/H3OOng8mY70ptlocS4JCwjzU7TtpNd/TuMueNUmn7Dx5XzFr1/fog8NdGfia5rWoz9TnP/i3ynyH/AORI3btw5skA7fis6+gUCd24E2PgZrI0Have+EKoUB3rJVyPw8qLGS2PLcv17ZMnsxMUdFyX9w+cMzhkDFLV1uN6e8poWvaaGI2gTdZlK0YTohT5+nl2WUtbQ3I3J+jua4J457d8vDxU6JWD/EEJTdcEbiD/AK5U1DxM6IXAkx43VMKC860pDbyEnc0SCAoApokHn9MtOuKCnDZ3ZtdHiuS9S1NwONjYtLI+qz9I57fJ/vmNNYksydQYaDa1syLKb5CFUbrvyLr5xR6H6r8NukNMdiwuqoz70hzzpMh91alvOEUVGxxfsPc5Va6l6Aj9fK6og9bMxXJCC3OhhaltSqTSFGx9JTweP+myji1a56v8jSybJqu0l6o6c9IejRlOBtVChSwayvHVLlalGVIQWwAop+mqFcn78jvmjd8Vug3QEOdR6ctHBNqV3BBHp7jJR4r9DEWOpIJHawVftifQevyPAFAC7wxG/NroT+ptP/yV+2Gcpl2fG0XVdRjxm2mJ8tppIoIQ8pIA79gcqTpUiUptUl914pTQLiyqh34vDDFDK1n3ws++GGdOBZ989ocWmwlagPg4YZjHiz74YYZjH//Z'),
    userEntryRequired: true,
    timeLength: 20,
    timeBased: false,
    weight: true,
    videoSrc: null
  };
  private _phases1: Phase = {
    id: 1,
    name: 'warmUp',
    exercises: [this._exercise1, this._exercise2],
    order: 1
  };

  private _phases2: Phase = {
    id: 1,
    name: 'strength',
    exercises: [this._exercise1, this._exercise2],
    order: 1
  };

  private _day: Day = {
    id: 1,
    name: 'monday',
    phases: [this._phases1, this._phases2]
  };
  get day(): Day {
    return this._day;
  }
}
