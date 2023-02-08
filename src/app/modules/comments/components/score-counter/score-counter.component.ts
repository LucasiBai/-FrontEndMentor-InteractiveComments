import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-counter',
  templateUrl: './score-counter.component.html',
  styleUrls: ['./score-counter.component.css'],
})
export class ScoreCounterComponent implements OnInit {
  @Input() initCount!: number;

  count!: number;

  ngOnInit() {
    this.count = this.initCount;
  }

  updateCount(operation: string) {
    operation === '+' ? this.count++ : this.count--;
  }
}
