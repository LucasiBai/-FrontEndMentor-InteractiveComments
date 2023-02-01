import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommentI } from '../../data/models/comment-i';
import { RequestService } from '../../data/services/request.service';

const initComment = {
  id: 0,
  content: '',
  createdAt: '',
  score: 0,
  user: {
    image: {
      png: '',
      webp: '',
    },
    username: '',
  },
  replies: [],
};

@Injectable({
  providedIn: 'root',
})
export class ReplyActionService {
  constructor(private _data: RequestService) {}

  private replyingTo$: BehaviorSubject<CommentI> =
    new BehaviorSubject<CommentI>(initComment);

  get replyingTo(): Observable<CommentI> {
    return this.replyingTo$.asObservable();
  }

  replyTo(id: number) {
    this._data
      .getComment(id)
      .subscribe((comment) => this.replyingTo$.next(comment));
  }
}
