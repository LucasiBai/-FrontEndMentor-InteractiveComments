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

  private lastCreatedIndex: number = 4;

  private obtainData() {
    return this.httpClient.get<DataI>('./assets/data.json');
  }

  public getData(): Observable<DataI> {
    return this.data$.asObservable();
  }

  public addComment(replyTo: Number = 1, payload: CommentI): void {
    this.lastCreatedIndex++;

    const data: DataI = this.data$.value;

    const updatedComment: CommentI = data.comments.filter(
      (comment) => comment.id === replyTo
    )[0];

    const comment: CommentI = {
      id: this.lastCreatedIndex,
      createdAt: 'recently added',
      ...payload,
    };

    updatedComment.replies.push(comment);

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

  public removeComment(commentId: Number | undefined) {
    const data = { ...this.data$.value };

    const updatedComments: CommentI[] = [];

    for (const comment of data.comments) {
      const updatedReplies = comment.replies.filter(
        (reply: CommentI) => reply.id !== commentId
      );

      comment.replies = updatedReplies;

      updatedComments.push(comment);
    }

    data.comments = updatedComments;

    this.data$.next(data);
  }

  public updateComment(commentId: Number | undefined, newContent: string) {
    const data = { ...this.data$.value };

    const updatedComments: CommentI[] = [];

    for (const comment of data.comments) {
      const updatedReplies = comment.replies.map((reply: CommentI) => {
        if (reply.id === commentId) {
          reply.content = newContent;
        }
        return reply;
      });

      comment.replies = updatedReplies;

      updatedComments.push(comment);
    }

    data.comments = updatedComments;

    this.data$.next(data);
  }
}
