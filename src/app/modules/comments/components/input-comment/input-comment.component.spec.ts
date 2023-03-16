import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs';
import { ButtonsModule } from 'src/app/modules/buttons/buttons.module';
import { DataModule } from 'src/app/modules/data/data.module';
import { RequestService } from 'src/app/modules/data/services/request.service';
import { UserIconComponent } from '../user-icon/user-icon.component';
import { InputCommentComponent } from './input-comment.component';
import { CommentI } from 'src/app/modules/data/models/comment-i';

describe('Test Input Comment', () => {
  let fixture: ComponentFixture<InputCommentComponent>;
  let component: InputCommentComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InputCommentComponent, UserIconComponent],
      imports: [ReactiveFormsModule, ButtonsModule, DataModule],
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

      expect(formGroup.controls['comment']).toBeTruthy();
    });

    it('Should be invalid with lower than three characters', () => {
      component.commentForm.setValue({
        comment: '12',
      });

      expect(component.commentForm.valid).toBeFalse();
    });
  });

  describe('Test sendComment', () => {
    let dataService: RequestService;

    beforeEach(() => {
      dataService = TestBed.inject(RequestService);
    });

    it('Should cannot send with invalid form', () => {
      component.commentForm.setValue({
        comment: '12',
      });

      const { comment: content } = component.commentForm.value;

      component.sendComment();

      dataService
        .getComment(5)
        .pipe(first())
        .subscribe((comment: CommentI) =>
          expect(comment.content).not.toEqual(content)
        );
    });

    it('Should create the sended comment', () => {
      component.commentForm.setValue({
        comment: 'Test comment',
      });

      component.sendComment();

      dataService
        .getComment(5)
        .pipe(first())
        .subscribe((comment: CommentI) => expect(comment.id).toBeTruthy());
    });
  });
});
