import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpEvent, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConstantsService} from '../../../../core/services/constants.service';
import {WorkoutDTO} from '../../../../core/model/swagger-model/workoutDTO';
import {DayDTO} from '../../../../core/model/swagger-model/dayDTO';
import {PhaseDTO} from '../../../../core/model/swagger-model/phaseDTO';
import {ExerciseDTO} from '../../../../core/model/swagger-model/exerciseDTO';
import {Vector} from '../../../../core/types/vector';
import {FilterGroupDTO} from '../../../../core/model/swagger-model/filterGroupDTO';

@Injectable({
  providedIn: 'root'
})
export class SaveWorkoutService {

  appUrl: string;
  private _workout: WorkoutDTO;
  private _file: File;
  private _imageUrl: string;
  private _base64Image: string;
  private _days: DayDTO[];
  private _pickedExercises: ExerciseDTO[];
  private _selection: Selection;
  private _dragPosition: Vector;

  constructor(
    private http: HttpClient,
    private constant: ConstantsService
  ) {
    this.appUrl = this.constant.baseAppUrl + 'save-workout-service/upload';
  }

  get base64Image(): string {
    return this._base64Image;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  get file(): File {
    return this._file;
  }

  cacheFile(file: File): void {
    this._file = file;
  }

  cacheUrl(url: string): void {
    this._imageUrl = url;
  }

  cacheWorkout(workout: WorkoutDTO): void {
    this._workout = workout;
  }

  cacheWorkoutImage(base64Image: string): void {
    this._base64Image = base64Image;
  }

  cacheDays(days: DayDTO[]): void {
    this._days = days;
  }

  cachePickedExercises(pickedExercises: ExerciseDTO[]): void {
    this._pickedExercises = pickedExercises;
  }

  cacheSelection(selection: Selection): void {
    this._selection = selection;
  }

  cacheDragPosition(dragPosition: Vector): void {
    this._dragPosition = new Vector(dragPosition.x, dragPosition.y);
  }

  get workout(): WorkoutDTO {
    return this._workout;
  }

  get days(): DayDTO[] {
    return this._days;
  }

  get pickedExercises(): ExerciseDTO[] {
    return this._pickedExercises;
  }

  get selection(): Selection {
    return this._selection;
  }

  get dragPosition(): Vector {
    console.log('x = ' + this._dragPosition.x + ' and y = ' + this._dragPosition.y);
    return this._dragPosition;
  }

  uploadWorkout(): Observable<string> {
    this.workout.previewImage = this._base64Image;
    const httpOptions = {
      headers: new HttpHeaders()
    };

    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    const saveWorkoutEndpoint = this.constant.baseAppUrl + 'save-workout-service/upload-workout';
    return this.http.post<string>(saveWorkoutEndpoint, this.workout, httpOptions);
  }
/*
  uploadFile(path: string): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', this._blob);
    formData.append('path', path);
    const httpOptions = {
      headers: new HttpHeaders()
    };
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');

    const params = new HttpParams().set('UserDTO', JSON.stringify(this.constant.getUser));
    return this.http.post<string>(this.appUrl, formData, httpOptions);
  }
*/
  getDayEnum(): Observable<DayDTO[]> {
    const getDaysEndpointUrl = this.constant.baseAppUrl + 'save-workout-service/get-days';
    return this.http.get<DayDTO[]>(getDaysEndpointUrl);
  }

  getPhaseEnum(): Observable<PhaseDTO[]> {
    const getDaysEndpointUrl = this.constant.baseAppUrl + 'save-workout-service/get-phases';
    return this.http.get<PhaseDTO[]>(getDaysEndpointUrl);
  }

  clearCache(): void {
    this._days = null;
    this._pickedExercises = null;
    this._selection = null;
    this._base64Image = null;
    this._imageUrl = null;
    this._file = null;
    this._dragPosition = new Vector(0, 0);
  }

  removeImage(): void {
    this._base64Image = null;
    this._imageUrl = null;
    this._file = null;
    this._dragPosition = new Vector(0, 0);
  }
}

export interface Selection {
  selectedDay: number;
  selectedPhase: number;
}
