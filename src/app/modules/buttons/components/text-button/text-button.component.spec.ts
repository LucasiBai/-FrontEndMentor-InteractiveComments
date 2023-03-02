import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextButtonComponent } from './text-button.component';

describe('Text Button', () => {
  let fixture: ComponentFixture<TextButtonComponent>;
  let component: TextButtonComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TextButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should render Text Button', () => {
    expect(component).toBeTruthy();
  });
});
