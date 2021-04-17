import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePostPresentationComponent } from './simple-post-presentation.component';

describe('SimplePostComponent', () => {
  let component: SimplePostPresentationComponent;
  let fixture: ComponentFixture<SimplePostPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimplePostPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplePostPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
