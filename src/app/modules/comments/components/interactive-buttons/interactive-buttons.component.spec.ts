import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { first } from 'rxjs';
import { DeleteButtonComponent } from '../buttons/delete-button/delete-button.component';
import { EditButtonComponent } from '../buttons/edit-button/edit-button.component';
import { ReplyButtonComponent } from '../buttons/reply-button/reply-button.component';
import { ScoreCounterComponent } from '../score-counter/score-counter.component';
import { InteractiveButtonsComponent } from './interactive-buttons.component';

describe('Test interactive-buttons mobile view', () => {
  let fixture: ComponentFixture<InteractiveButtonsComponent>;
  let component: InteractiveButtonsComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        InteractiveButtonsComponent,
        ReplyButtonComponent,
        ScoreCounterComponent,
        DeleteButtonComponent,
        EditButtonComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InteractiveButtonsComponent);
    component = fixture.componentInstance;

    component.initCount = 0;
    component.platform = 'mobile';

    fixture.detectChanges();
  }));

  describe('Test own comment interactive-buttons', () => {
    beforeEach(() => {
      component.ownComment = true;
      fixture.detectChanges();
    });

    it('Should render interactive-buttons', () => {
      expect(component).toBeTruthy();
    });

    it('Should render counter', () => {
      const counter =
        fixture.debugElement.nativeElement.querySelector('app-score-counter');

      expect(counter).toBeTruthy();
    });

    it('Should render edit and delete button', () => {
      const DOM = fixture.debugElement.nativeElement;

      const editButton = DOM.querySelector('app-edit-button');
      const deleteButton = DOM.querySelector('app-delete-button');

      const replyButton = DOM.querySelector('app-reply-button');

      expect(editButton).toBeTruthy();
      expect(deleteButton).toBeTruthy();

      expect(replyButton).toBeNull();
    });

    describe('Test emitScore()', () => {
      it('Should emit init score to parent component', () => {
        component.countEvent
          .pipe(first())
          .subscribe((count: number) =>
            expect(count).toEqual(component.initCount)
          );

        component.emitScore(component.initCount);
      });

      it('Should emit new score to parent component', () => {
        component.countEvent
          .pipe(first())
          .subscribe((count: number) => expect(count).toEqual(5));

        component.emitScore(5);
      });
    });

    describe('Test emitDelete()', () => {
      it('Should emit delete action to parent component', () => {
        component.deleteEvent
          .pipe(first())
          .subscribe((action) => expect(action).toBeUndefined());

        component.emitDelete();
      });
    });

    describe('Test emitEdit()', () => {
      it('Should emit edit action to parent component', () => {
        component.editEvent
          .pipe(first())
          .subscribe((action) => expect(action).toBeUndefined());

        component.emitEdit();
      });
    });
  });

  describe('Test from other comment interactive-buttons', () => {
    beforeEach(() => {
      component.ownComment = false;
      fixture.detectChanges();
    });

    it('Should render interactive-buttons', () => {
      expect(component).toBeTruthy();
    });

    it('Should render counter', () => {
      const counter =
        fixture.debugElement.nativeElement.querySelector('app-score-counter');

      expect(counter).toBeTruthy();
    });

    it('Should render reply button', () => {
      const DOM = fixture.debugElement.nativeElement;

      const replyButton = DOM.querySelector('app-reply-button');

      const editButton = DOM.querySelector('app-edit-button');
      const deleteButton = DOM.querySelector('app-delete-button');

      expect(replyButton).toBeTruthy();

      expect(editButton).toBeNull();
      expect(deleteButton).toBeNull();
    });

    describe('Test emitScore()', () => {
      it('Should emit init score to parent component', () => {
        component.countEvent
          .pipe(first())
          .subscribe((count: number) =>
            expect(count).toEqual(component.initCount)
          );

        component.emitScore(component.initCount);
      });

      it('Should emit new score to parent component', () => {
        component.countEvent
          .pipe(first())
          .subscribe((count: number) => expect(count).toEqual(5));

        component.emitScore(5);
      });
    });

    describe('Test emitReply()', () => {
      it('Should emit reply action to parent component', () => {
        component.replyEvent
          .pipe(first())
          .subscribe((action) => expect(action).toBeUndefined());

        component.emitReply();
      });
    });
  });
});

describe('Test interactive-buttons desktop view', () => {
  let fixture: ComponentFixture<InteractiveButtonsComponent>;
  let component: InteractiveButtonsComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        InteractiveButtonsComponent,
        ReplyButtonComponent,
        DeleteButtonComponent,
        EditButtonComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InteractiveButtonsComponent);
    component = fixture.componentInstance;

    component.platform = 'desktop';

    fixture.detectChanges();
  }));
  // TODO: Test component functions

  describe('Test own comment interactive-buttons', () => {
    beforeEach(() => {
      component.ownComment = true;
      fixture.detectChanges();
    });

    it('Should render interactive-buttons', () => {
      expect(component).toBeTruthy();
    });

    it('Should no render counter', () => {
      const counter =
        fixture.debugElement.nativeElement.querySelector('app-score-counter');

      expect(counter).toBeNull();
    });

    it('Should render edit and delete button', () => {
      const DOM = fixture.debugElement.nativeElement;

      const editButton = DOM.querySelector('app-edit-button');
      const deleteButton = DOM.querySelector('app-delete-button');

      const replyButton = DOM.querySelector('app-reply-button');

      expect(editButton).toBeTruthy();
      expect(deleteButton).toBeTruthy();

      expect(replyButton).toBeNull();
    });

    describe('Test emitDelete()', () => {
      it('Should emit delete action to parent component', () => {
        component.deleteEvent
          .pipe(first())
          .subscribe((action) => expect(action).toBeUndefined());

        component.emitDelete();
      });
    });

    describe('Test emitEdit()', () => {
      it('Should emit edit action to parent component', () => {
        component.editEvent
          .pipe(first())
          .subscribe((action) => expect(action).toBeUndefined());

        component.emitEdit();
      });
    });
  });
  describe('Test from other comment interactive-buttons', () => {
    beforeEach(() => {
      component.ownComment = false;
      fixture.detectChanges();
    });

    it('Should render interactive-buttons', () => {
      expect(component).toBeTruthy();
    });

    it('Should no render counter', () => {
      const counter =
        fixture.debugElement.nativeElement.querySelector('app-score-counter');

      expect(counter).toBeNull();
    });

    it('Should render reply button', () => {
      const DOM = fixture.debugElement.nativeElement;

      const replyButton = DOM.querySelector('app-reply-button');

      const editButton = DOM.querySelector('app-edit-button');
      const deleteButton = DOM.querySelector('app-delete-button');

      expect(replyButton).toBeTruthy();

      expect(editButton).toBeNull();
      expect(deleteButton).toBeNull();
    });

    describe('Test emitReply()', () => {
      it('Should emit reply action to parent component', () => {
        component.replyEvent
          .pipe(first())
          .subscribe((action) => expect(action).toBeUndefined());

        component.emitReply();
      });
    });
  });
});
