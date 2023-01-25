import { Component, Input, OnInit } from '@angular/core';
import { UserI } from 'src/app/models/user-i';
import { CommentI } from 'src/app/models/comment-i';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { UserProviderService } from 'src/app/services/user-provider.service';
import { ReplyCommentService } from 'src/app/services/reply-comment.service';

@Component({
  selector: 'app-text-input-comment',
  templateUrl: './text-input-comment.component.html',
  styleUrls: ['./text-input-comment.component.css'],
})
export class TextInputCommentComponent implements OnInit {
  @Input() replyingTo!: string | undefined;

  comment: any = { message: '' };
  currentUser!: UserI;
  replyingComment!: CommentI;

  constructor(
    private _user: UserProviderService,
    private _data: ApiRequestsService,
    private _reply: ReplyCommentService
  ) {}

  ngOnInit(): void {
    this._user.currentUserObservable.subscribe(
      (res: UserI) => (this.currentUser = res)
    );

    this._reply.replyingComment.subscribe((res) => {
      if (res !== undefined) {
        this.replyingComment = res;
      }
    });
  }

  uploadComment() {
    const payload: CommentI = {
      content: this.comment.message,
      createdAt: '',
      score: 0,
      user: this.currentUser,
      replies: [],
      replyingTo: this.replyingTo,
    };

    this._reply.closeReply();

    this._data.addComment(this.replyingComment?.id, payload);
  }
}
