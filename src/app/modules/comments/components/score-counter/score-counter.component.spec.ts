import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { first } from 'rxjs';
import { ScoreCounterComponent } from './score-counter.component';

describe('Test Score Counter Component', () => {
  let fixture: ComponentFixture<ScoreCounterComponent>;
  let component: ScoreCounterComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreCounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreCounterComponent);
    component = fixture.componentInstance;
    component.initCount = 5;

    fixture.detectChanges();
  }));

  it('Should render correctly', () => {
    expect(component).toBeTruthy();

    expect(component.count).toEqual(5);
  });

  describe('Test countEvent', () => {
    it('Should emit + current count', () => {
      component.countEvent
        .pipe(first())
        .subscribe((count: number) => expect(count).toEqual(6));

      component.updateCount('+');
    });

    it('Should emit - current count', () => {
      component.countEvent
        .pipe(first())
        .subscribe((count: number) => expect(count).toEqual(4));

      component.updateCount('-');
    });
  });

  describe('Test updateCount()', () => {
    it('Should sum to current count', () => {
      const currentCount = component.count;

      component.updateCount('+');

      expect(component.count).toEqual(currentCount + 1);
      expect(component.count).not.toEqual(currentCount);
    });

    it('Should subtract to current count', () => {
      const currentCount = component.count;

      component.updateCount('-');

      expect(component.count).toEqual(currentCount - 1);
      expect(component.count).not.toEqual(currentCount);
    });
  });

  describe('Test ngOnChanges()', () => {
    it('Should render the new count passed', () => {
      component.ngOnChanges({
        initCount: new SimpleChange(null, 2, false),
      });

      fixture.detectChanges();

      const span = fixture.debugElement.nativeElement.querySelector('.count');

      expect(span.innerText).toEqual('2');
    });
  });
});
