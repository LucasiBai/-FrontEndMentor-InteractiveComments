import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-score-counter',
  templateUrl: './score-counter.component.html',
  styleUrls: ['./score-counter.component.css'],
})
export class ScoreCounterComponent implements OnInit, OnChanges {
  @Input() initCount!: number;
  @Output() countEvent: EventEmitter<number> = new EventEmitter<number>();

  count!: number;

  ngOnInit() {
    this.count = this.initCount;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue } = changes?.['initCount'];

    this.count = currentValue;
  }

  updateCount(operation: string) {
    operation === '+' ? this.count++ : this.count--;
    this.countEvent.emit(this.count);
  }
}
