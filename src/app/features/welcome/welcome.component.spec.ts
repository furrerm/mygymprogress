import {ComponentFixture, inject, TestBed, waitForAsync} from '@angular/core/testing';

import {WelcomeComponent} from './welcome.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthenticationService} from '../../core/services/authentication.service';
import {Injectable} from '@angular/core';
import {UserDTO} from '../../core/model/swagger-model/userDTO';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  const authState: UserDTO = {
    email:  '',
    emailVerified: false,
    firstSignIn: false,
    issuer: '',
    name: '',
    pictureUrl: '',
    uid: '',
    id: 1
  };

  const mockAngularFireAuth: any = {
    onAuthStateChanged(): void {
      return null;
    },
    authState: of(authState)
  };
  const stateMock = {
    authState: of({
        email:  '',
        emailVerified: false,
        firstSignIn: false,
        issuer: '',
        name: '',
        pictureUrl: '',
        uid: '',
        id: 1
      })
    };

  const authServiceMock = {
    afAuth: stateMock
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: AngularFireAuth, useValue: mockAngularFireAuth },
        {provide: AuthenticationService, useClass: AuthenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

