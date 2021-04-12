import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePostComponent } from './simple-post.component';

describe('SimplePostComponent', () => {
  let component: SimplePostComponent;
  let fixture: ComponentFixture<SimplePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimplePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
