import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { CommentI } from 'src/app/models/comment-i';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { ReplyCommentService } from 'src/app/services/reply-comment.service';
import { TextInputCommentComponent } from '../text-input-comment/text-input-comment.component';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css'],
})
export class CommentCardComponent implements OnInit {
  @Input() comment!: CommentI;
  @Input() currentUser!: string;

  @ViewChild(TextInputCommentComponent, { static: false })
  replyInput!: TextInputCommentComponent;

  constructor(
    private _reply: ReplyCommentService,
    private _data: ApiRequestsService
  ) {}

  isCreator: boolean = false;
  isReplying: boolean = false;
  replyingTo!: string | undefined;

  ngOnInit() {
    this.isCreator = this.comment.user.username === this.currentUser;

    this._reply.replyingComment.subscribe((comment: CommentI | undefined) => {
      this.isReplying = comment?.id === this.comment.id;
      this.replyingTo = comment?.user.username;
    });
  }

  deleteComment() {
    this._data.removeComment(this.comment.id);
  }

  editComment() {
    console.log('edit');
  }
}
