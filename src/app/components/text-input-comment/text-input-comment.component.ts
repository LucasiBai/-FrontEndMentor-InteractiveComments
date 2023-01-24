import { Component, Input, OnInit } from '@angular/core';
import { UserI } from 'src/app/models/user-i';
import { CommentI } from 'src/app/models/comment-i';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { UserProviderService } from 'src/app/services/user-provider.service';

@Component({
  selector: 'app-text-input-comment',
  templateUrl: './text-input-comment.component.html',
  styleUrls: ['./text-input-comment.component.css'],
})
export class TextInputCommentComponent implements OnInit {
  @Input() replyingTo!: string | undefined;

  currentUser!: UserI;

  constructor(
    private _user: UserProviderService,
    private _data: ApiRequestsService
  ) {}

  ngOnInit(): void {
    this._user.currentUserObservable.subscribe(
      (res: UserI) => (this.currentUser = res)
    );
  }

  comment: any = { message: '' };
  uploadComment() {
    const payload: CommentI = {
      content: this.comment.message,
      createdAt: '',
      score: 0,
      user: this.currentUser,
      replies: [],
      replyingTo: this.replyingTo,
    };

    this._data.addComment(1, payload);
  }
}
