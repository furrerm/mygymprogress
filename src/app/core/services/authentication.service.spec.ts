import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {compileInjectable} from '@angular/compiler';
import {Injectable} from '@angular/core';


describe('AuthenticationService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [{ provide: AngularFireAuth, useValue: AngularFireAuthMock }]
  }));

  it('should be created', () => {
    const service: AuthenticationService = TestBed.inject(AuthenticationService);
    expect(service).toBeTruthy();
  });
});
@Injectable()
class AngularFireAuthMock extends AngularFireAuth {           // added this class
  public login() { console.log('loign'); }
  public logout() { console.log('logout'); }
}
