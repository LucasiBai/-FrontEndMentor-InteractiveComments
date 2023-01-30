import { Component, Input } from '@angular/core';
import { CommentI } from 'src/app/modules/data/models/comment-i';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css'],
})
export class CommentCardComponent {
  @Input() comment!: CommentI;
}
