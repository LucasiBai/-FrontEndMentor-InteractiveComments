import { Component, Input } from '@angular/core';
import { CommentI } from 'src/app/models/comment-i';

@Component({
  selector: 'app-comment-header',
  templateUrl: './comment-header.component.html',
  styleUrls: ['./comment-header.component.css'],
})
export class CommentHeaderComponent {
  @Input() comment!: CommentI;
  @Input() isCreator!: boolean;
}
