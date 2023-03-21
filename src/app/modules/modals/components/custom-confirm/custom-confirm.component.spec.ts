import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ButtonsModule } from 'src/app/modules/buttons/buttons.module';
import { CustomConfirmComponent } from './custom-confirm.component';

describe('Test Custom Confirm Modal', () => {
  let fixture: ComponentFixture<CustomConfirmComponent>;
  let component: CustomConfirmComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CustomConfirmComponent],
      imports: [ButtonsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomConfirmComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('Should render modal', () => {
    expect(component).toBeTruthy();
  });

  it('Should not render in DOM as init', () => {
    const domComponent =
      fixture.debugElement.nativeElement.querySelector('.modal__box');
    expect(domComponent).toBeFalsy();
  });
});
