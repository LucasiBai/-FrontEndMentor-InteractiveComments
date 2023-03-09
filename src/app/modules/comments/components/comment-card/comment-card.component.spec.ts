import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommentI } from 'src/app/modules/data/models/comment-i';
import { ReplyActionService } from '../../services/reply-action.service';
import { ReplyButtonComponent } from '../buttons/reply-button/reply-button.component';
import { CommentContentComponent } from '../comment-content/comment-content.component';
import { InteractiveButtonsComponent } from '../interactive-buttons/interactive-buttons.component';
import { ScoreCounterComponent } from '../score-counter/score-counter.component';
import { UserIconComponent } from '../user-icon/user-icon.component';
import { CommentCardComponent } from './comment-card.component';

import { DataModule } from 'src/app/modules/data/data.module';
import { ModalsModule } from 'src/app/modules/modals/modals.module';

import { ConfirmService } from 'src/app/modules/modals/services/confirm-service.service';
import { RequestService } from 'src/app/modules/data/services/request.service';
import { ConfirmI } from 'src/app/modules/modals/models/confirm-i';
import { DeleteButtonComponent } from '../buttons/delete-button/delete-button.component';
import { EditButtonComponent } from '../buttons/edit-button/edit-button.component';
import { CommentRepliesListComponent } from '../comment-replies-list/comment-replies-list.component';

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

describe('Test Comment Card', () => {
  let fixture: ComponentFixture<CommentCardComponent>;
  let component: CommentCardComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommentCardComponent,
        ScoreCounterComponent,
        UserIconComponent,
        InteractiveButtonsComponent,
        CommentContentComponent,
        ReplyButtonComponent,
        DeleteButtonComponent,
        EditButtonComponent,
        CommentRepliesListComponent,
        ReplyButtonComponent,
      ],
      imports: [DataModule, ModalsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentCardComponent);
    component = fixture.componentInstance;
    component.comment = mockCommentCard;
    fixture.detectChanges();
  }));

  it('Should render comment card', () => {
    expect(component).toBeTruthy();
  });

  describe('Test own comment', () => {
    beforeEach(() => {
      component.ownComment = true;
      fixture.detectChanges();
    });

    it("Should render 'you' label next to the name", () => {
      const h6 = fixture.debugElement.nativeElement.querySelector('h6');

      expect(h6).toBeTruthy();
    });
  });

  describe('Test comment replies', () => {
    beforeEach(() => {
      component.comment.replies = mockCommentReplies;
      fixture.detectChanges();
    });

    it('Should render comment replies', () => {
      const replies = fixture.debugElement.nativeElement
        .querySelector('app-comment-replies-list')
        .querySelectorAll('app-comment-card');

      expect(replies.length).toEqual(2);
      expect(replies).toBeTruthy();
    });
  });

  describe('Test setScore()', () => {
    it('Should update score', () => {
      const initScore = mockCommentCard['score'];

      component.setScore(5);

      const currentScore = component.comment['score'];

      expect(initScore !== currentScore).toBeTrue();

      expect(currentScore).toEqual(5);
    });
  });

  describe('Test switchUpdating()', () => {
    it('Should switch updating', () => {
      const initState = component.updating;

      expect(initState).toBeFalse();

      component.switchUpdating();

      expect(component.updating).toBeTrue();

      component.switchUpdating();

      expect(component.updating).toBeFalse();
    });
  });

  describe('Test updateComment()', () => {
    let dataService: RequestService;

    beforeEach(() => {
      dataService = TestBed.inject(RequestService);
    });

    it('Should update comment', () => {
      const commentId = component.comment.id || 0;
      component.switchUpdating();

      component.updateComment('Test update content');

      dataService
        .getComment(commentId)
        .subscribe((comment: CommentI) =>
          expect(comment.content).toEqual('Test update content')
        );
    });

    it("Should update 'updating' to false", () => {
      component.switchUpdating();

      expect(component.updating).toBeTrue();

      component.updateComment('');

      expect(component.updating).toBeFalse();
    });
  });

  describe('Tests replyComment()', () => {
    let service: ReplyActionService;

    beforeEach(() => {
      service = TestBed.inject(ReplyActionService);
    });

    it('Should update replyingTo ', () => {
      component.replyComment();

      service.replyingTo.subscribe((replyingTo: CommentI) => {
        expect(replyingTo.id).toEqual(mockCommentCard.id);
      });
    });
  });

  describe('Tests deleteComment()', () => {
    let dataService: RequestService;
    let modalService: ConfirmService;

    beforeEach(() => {
      dataService = TestBed.inject(RequestService);
      modalService = TestBed.inject(ConfirmService);
    });

    it('Should ask for delete comment', () => {
      const commentId = component.comment.id || 0;

      expect(dataService.getComment(commentId)).toBeTruthy();

      component.deleteComment();

      modalService.isConfirming.subscribe((confirm: ConfirmI) => {
        expect(confirm.isConfirming).toBeTrue();
      });
    });
  });
});
