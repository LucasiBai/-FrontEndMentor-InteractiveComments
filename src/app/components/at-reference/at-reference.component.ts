import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-at-reference',
  templateUrl: './at-reference.component.html',
  styleUrls: ['./at-reference.component.css'],
})
export class AtReferenceComponent {
  @Input() replyingTo!: string;
}
