import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePostFooterComponent } from './simple-post-footer.component';

describe('SimplePostFooterComponent', () => {
  let component: SimplePostFooterComponent;
  let fixture: ComponentFixture<SimplePostFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimplePostFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplePostFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
