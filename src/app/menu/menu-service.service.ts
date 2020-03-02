import { Injectable, Inject } from '@angular/core';
import { Winning } from './Winning';
import { WINNINGMOCKS } from './mock-winnings';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {
  appUrl: string;
  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {

    this.appUrl = 'http://' + this.document.location.hostname + ':8000/api/test';
  }

  getWinnings1() {
    return (this.http.get<string>(this.appUrl));
  }
}



