import { Component, Input } from '@angular/core';

import { CommentI } from 'src/app/models/comment-i';

@Component({
  selector: 'app-comment-replys-list',
  templateUrl: './comment-replys-list.component.html',
  styleUrls: ['./comment-replys-list.component.css'],
})
export class CommentReplysListComponent {
  @Input() replies!: CommentI[];
  @Input() currentUser!: string;
}
