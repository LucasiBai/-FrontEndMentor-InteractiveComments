import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'src/app/modules/buttons/buttons.module';
import { UserIconComponent } from '../user-icon/user-icon.component';
import { InputCommentComponent } from './input-comment.component';

fdescribe('Test Input Comment', () => {
  let fixture: ComponentFixture<InputCommentComponent>;
  let component: InputCommentComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InputCommentComponent, UserIconComponent],
      imports: [ReactiveFormsModule, ButtonsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InputCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should render correct', () => {
    expect(component).toBeTruthy();
  });

  it('Should be focused on init', () => {
    const input = fixture.debugElement.nativeElement.querySelector('textarea');
  });

  describe('Test initForm()', () => {
    it('Should return init form build', () => {
      const formGroup = component.initForm();

      expect(formGroup).toBeTruthy();
      console.log(formGroup);

      expect(formGroup.controls['comment']).toBeTruthy();
    });
  });

  describe('Test sendComment', () => {
    it('Should create the sended comment', () => {});
  });
});
