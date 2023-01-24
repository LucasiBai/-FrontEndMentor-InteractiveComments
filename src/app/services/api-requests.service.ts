import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataI } from '../models/data-i';
import { BehaviorSubject, Observable } from 'rxjs';

import { CommentI } from '../models/comment-i';

const initData = {
  currentUser: {
    image: {
      png: '',
      webp: '',
    },
    username: '',
  },
  comments: [],
};

@Injectable({
  providedIn: 'root',
})
export class ApiRequestsService {
  private data$: BehaviorSubject<DataI> = new BehaviorSubject<DataI>(initData);

  constructor(private httpClient: HttpClient) {
    this.obtainData().subscribe((res: DataI) => {
      this.data$.next(res);
    });
  }

  private obtainData() {
    return this.httpClient.get<DataI>('./assets/data.json');
  }

  public getData(): Observable<DataI> {
    return this.data$.asObservable();
  }

  public addComment(replyTo: Number, payload: CommentI): void {
    const data: DataI = this.data$.value;

    const updatedComment: CommentI = data.comments.filter(
      (comment) => comment.id === replyTo
    )[0];

    updatedComment.replies.push(payload);

    const updatedComments: CommentI[] = data.comments.map(
      (comment: CommentI) => {
        if (comment.id == updatedComment?.id) {
          return updatedComment;
        }
        return comment;
      }
    );

    data.comments = updatedComments;

    this.data$.next(data);
  }
}
