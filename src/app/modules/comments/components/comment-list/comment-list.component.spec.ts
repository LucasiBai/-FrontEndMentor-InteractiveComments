import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommentCardComponent } from '../comment-card/comment-card.component';
import { CommentListComponent } from './comment-list.component';
import { CommentI } from 'src/app/modules/data/models/comment-i';
import { ScoreCounterComponent } from '../score-counter/score-counter.component';
import { CommentsRoutingModule } from '../../comments-routing.module';
import { CommentContentComponent } from '../comment-content/comment-content.component';
import { UserIconComponent } from '../user-icon/user-icon.component';
import { InteractiveButtonsComponent } from '../interactive-buttons/interactive-buttons.component';
import { ReplyButtonComponent } from '../buttons/reply-button/reply-button.component';
import { CommentRepliesListComponent } from '../comment-replies-list/comment-replies-list.component';
import { InputCommentComponent } from '../input-comment/input-comment.component';
import { ButtonsModule } from 'src/app/modules/buttons/buttons.module';
import { DeleteButtonComponent } from '../buttons/delete-button/delete-button.component';
import { EditButtonComponent } from '../buttons/edit-button/edit-button.component';
import { ReactiveFormsModule } from '@angular/forms';

const mockComponentList: CommentI[] = [
  {
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
  },
  {
    id: 2,
    content:
      "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    createdAt: '2 weeks ago',
    score: 5,
    user: {
      image: {
        png: './images/avatars/image-maxblagun.png',
        webp: './images/avatars/image-maxblagun.webp',
      },
      username: 'maxblagun',
    },
    replies: [],
  },
];

describe('Test Comment List Component', () => {
  let fixture: ComponentFixture<CommentListComponent>;
  let component: CommentListComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ButtonsModule, ReactiveFormsModule],
      declarations: [
        CommentListComponent,
        CommentCardComponent,
        ScoreCounterComponent,
        CommentContentComponent,
        UserIconComponent,
        InteractiveButtonsComponent,
        ReplyButtonComponent,
        CommentRepliesListComponent,
        InputCommentComponent,
        DeleteButtonComponent,
        EditButtonComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  describe('Tests component list with no comments', () => {
    it('Should render correctly', () => {
      expect(component).toBeTruthy();
    });

    it('Should render <h2>No comments have been created.</h2>', () => {
      const h2 = fixture.debugElement.nativeElement.querySelector('h2');

      expect(h2.innerText).toEqual('No comments have been created.');
    });
  });

  describe('Tests component list with comments', () => {
    beforeEach(() => {
      component.comment_list = mockComponentList;
      fixture.detectChanges();
    });

    it('Should render correctly', () => {
      expect(component).toBeTruthy();
    });

    it('Should render comment cards', () => {
      const commentCardList =
        fixture.debugElement.nativeElement.querySelectorAll('app-comment-card');

      expect(commentCardList).toBeTruthy();

      expect(commentCardList.length).toEqual(mockComponentList.length);
    });
  });
});
