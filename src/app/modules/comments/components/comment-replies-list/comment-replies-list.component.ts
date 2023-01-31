import { Component, Input } from '@angular/core';
import { CommentI } from 'src/app/modules/data/models/comment-i';

@Component({
  selector: 'app-comment-replies-list',
  templateUrl: './comment-replies-list.component.html',
  styleUrls: ['./comment-replies-list.component.css'],
})
export class CommentRepliesListComponent {
  @Input() replies!: CommentI[];
}
