import { Component, Input, OnInit } from '@angular/core';
import { ReplyActionService } from 'src/app/modules/actions/services/reply-action.service';
import { CommentI } from 'src/app/modules/data/models/comment-i';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css'],
})
export class CommentCardComponent implements OnInit {
  constructor(private _reply: ReplyActionService) {}
  @Input() comment!: CommentI;

  isReplying: boolean = false;

  ngOnInit(): void {
    this._reply.replyingTo.subscribe((commentR: CommentI) => {
      this.isReplying = commentR.id === this.comment.id;
    });
  }

  replyComment() {
    this._reply.replyTo(this.comment.id || 0);
  }
}
