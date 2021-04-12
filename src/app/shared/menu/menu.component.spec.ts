import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {WelcomeComponent} from '../../features/welcome/welcome.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  const welcomeComponentStub = {

  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: WelcomeComponent,
          useValue: welcomeComponentStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
