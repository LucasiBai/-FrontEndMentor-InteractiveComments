import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommentI } from '../models/comment-i';

@Injectable({
  providedIn: 'root',
})
export class ReplyCommentService {
  constructor() {}

  private replyingComment$: BehaviorSubject<CommentI | undefined> =
    new BehaviorSubject<CommentI | undefined>(undefined);

  get replyingComment(): Observable<CommentI | undefined> {
    return this.replyingComment$.asObservable();
  }

  public setReplyingComment(comment: CommentI): void {
    if (comment.id !== this.replyingComment$.value?.id) {
      this.replyingComment$.next(comment);
    } else {
      this.replyingComment$.next(undefined);
    }
  }

  public closeReply(): void {
    this.replyingComment$.next(undefined);
  }
}
