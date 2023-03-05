import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommentI } from 'src/app/modules/data/models/comment-i';
import { ReplyButtonComponent } from '../buttons/reply-button/reply-button.component';
import { CommentContentComponent } from '../comment-content/comment-content.component';
import { InteractiveButtonsComponent } from '../interactive-buttons/interactive-buttons.component';
import { ScoreCounterComponent } from '../score-counter/score-counter.component';
import { UserIconComponent } from '../user-icon/user-icon.component';
import { CommentCardComponent } from './comment-card.component';

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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentCardComponent);
    component = fixture.componentInstance;
    component.comment = mockCommentCard;
    fixture.detectChanges();
  }));

  it('Should render comment card', () => {
    expect(component).toBeTruthy();
  });

  it('Should update score, setScore()', () => {
    const initScore = mockCommentCard['score'];

    component.setScore(5);

    const currentScore = component.comment['score'];

    expect(initScore !== currentScore).toBeTrue();

    expect(currentScore).toEqual(5);
  });

  it('Should switch updating, switchUpdating()', () => {
    const initState = component.updating;

    expect(initState).toBeFalse();

    component.switchUpdating();

    expect(component.updating).toBeTrue();

    component.switchUpdating();

    expect(component.updating).toBeFalse();
  });

  it("Should update 'updating' to false, updateComment()", () => {
    component.switchUpdating();

    expect(component.updating).toBeTrue();

    component.updateComment('');

    expect(component.updating).toBeFalse();
  });
});
