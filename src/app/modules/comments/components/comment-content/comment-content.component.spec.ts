import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';
import { ButtonsModule } from 'src/app/modules/buttons/buttons.module';
import { CommentI } from 'src/app/modules/data/models/comment-i';
import { CommentContentComponent } from './comment-content.component';

const mockCommentCard: CommentI = {
  id: 1,
  content:
    "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
  createdAt: '1 month ago',
  score: 12,
  user: {
    image: {
      png: './images/avatars/image-amyrobson.png',
      webp: './images/avatars/image-amyrobson.webp',
    },
    username: 'amyrobson',
  },
  replies: [],
};

describe('Test CommentContent', () => {
  let fixture: ComponentFixture<CommentContentComponent>;
  let component: CommentContentComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CommentContentComponent],
      imports: [ButtonsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentContentComponent);
    component = fixture.componentInstance;
    component.comment = mockCommentCard;
    component.updating = false;
    fixture.detectChanges();
  }));

  it('Shold render component', () => {
    expect(component).toBeTruthy();

    expect(component.comment).toEqual(mockCommentCard);

    expect(component.updating).toBeFalse();

    const p = fixture.debugElement.nativeElement.querySelector('p');

    expect(p.innerText).toEqual(mockCommentCard.content);
  });

  describe('Test update stage', () => {
    it('Should render form if updating is true', () => {
      component.updating = true;

      fixture.detectChanges();

      const form = fixture.debugElement.nativeElement.querySelector('form');

      expect(form).toBeTruthy();
    });
  });

  describe('test emitContent()', () => {
    it('Should emit updated content', () => {
      component.updating = true;

      const payload = 'Test update content';
      component.commentForm.value.content = payload;

      component.updateContentEvent
        .pipe(first())
        .subscribe((updatedContent: string) =>
          expect(updatedContent).toEqual(payload)
        );

      component.emitContent();
    });
  });
});
