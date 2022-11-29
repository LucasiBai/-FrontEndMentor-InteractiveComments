import { Component, Input } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';

@Component({
  selector: 'app-score-counter',
  templateUrl: './score-counter.component.html',
  styleUrls: ['./score-counter.component.css'],
})
export class ScoreCounterComponent {
  @Input() value!: number;

  constructor(private apiRequest: ApiRequestsService) {}

  handleUpdateScore(operator: string) {
    const value =
      operator === '+' ? this.value + 1 : this.value > 1 ? this.value - 1 : 0;
    this.value = value;
  }
}
