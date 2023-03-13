import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'src/app/modules/buttons/buttons.module';
import { CommentI } from 'src/app/modules/data/models/comment-i';
import { DeleteButtonComponent } from '../buttons/delete-button/delete-button.component';
import { EditButtonComponent } from '../buttons/edit-button/edit-button.component';
import { ReplyButtonComponent } from '../buttons/reply-button/reply-button.component';
import { CommentCardComponent } from '../comment-card/comment-card.component';
import { CommentContentComponent } from '../comment-content/comment-content.component';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { InputCommentComponent } from '../input-comment/input-comment.component';
import { InteractiveButtonsComponent } from '../interactive-buttons/interactive-buttons.component';
import { ScoreCounterComponent } from '../score-counter/score-counter.component';
import { UserIconComponent } from '../user-icon/user-icon.component';
import { CommentRepliesListComponent } from './comment-replies-list.component';

const mockCommentReplies: CommentI[] = [
  {
    id: 3,
    content:
      "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
    createdAt: '1 week ago',
    score: 4,
    replyingTo: 'maxblagun',
    user: {
      image: {
        png: './images/avatars/image-ramsesmiron.png',
        webp: './images/avatars/image-ramsesmiron.webp',
      },
      username: 'ramsesmiron',
    },
  },
  {
    id: 4,
    content:
      "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
    createdAt: '2 days ago',
    score: 2,
    replyingTo: 'ramsesmiron',
    user: {
      image: {
        png: './images/avatars/image-juliusomo.png',
        webp: './images/avatars/image-juliusomo.webp',
      },
      username: 'juliusomo',
    },
  },
];

describe('Test Comment Replies list', () => {
  let fixture: ComponentFixture<CommentRepliesListComponent>;
  let component: CommentRepliesListComponent;

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

    fixture = TestBed.createComponent(CommentRepliesListComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  describe('Test Comment replies no comments', () => {
    it('Should render correctly', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Test Comment Replies with comments', () => {
    beforeEach(() => {
      component.replies = mockCommentReplies;
      fixture.detectChanges();
    });

    it('Should render correctly', () => {
      expect(component).toBeTruthy();
    });
  });
});
