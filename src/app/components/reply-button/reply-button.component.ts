import { Component, Input } from '@angular/core';
import { CommentI } from 'src/app/models/comment-i';
import { ReplyCommentService } from 'src/app/services/reply-comment.service';

@Component({
  selector: 'app-reply-button',
  templateUrl: './reply-button.component.html',
  styleUrls: ['./reply-button.component.css'],
})
export class ReplyButtonComponent {
  @Input() comment!: CommentI;

  constructor(private _reply: ReplyCommentService) {}

  replyComment(): void {
    this._reply.setReplyingComment(this.comment);
  }
}
