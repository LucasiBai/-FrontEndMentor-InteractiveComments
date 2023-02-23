import { Injectable } from '@angular/core';

import { BehaviorSubject, first, Observable } from 'rxjs';

import { CommentI } from '../models/comment-i';

const localData = localStorage.getItem('comments');

const initComments: CommentI[] = localData
  ? JSON.parse(localData)
  : [
      {
        id: 1,
        content:
          "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        createdAt: '1 month ago',
        score: 12,
        user: {
          image: {
            png: './assets/images/avatars/image-amyrobson.png',
            webp: './assets/images/avatars/image-amyrobson.webp',
          },
          username: 'amyrobson',
        },
        replies: [],
      },
      {
        id: 2,
        content:
          "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        createdAt: '2 weeks ago',
        score: 5,
        user: {
          image: {
            png: './assets/images/avatars/image-maxblagun.png',
            webp: './assets/images/avatars/image-maxblagun.webp',
          },
          username: 'maxblagun',
        },
        replies: [
          {
            id: 3,
            content:
              "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            createdAt: '1 week ago',
            score: 4,
            replyingTo: 'maxblagun',
            user: {
              image: {
                png: './assets/images/avatars/image-ramsesmiron.png',
                webp: './assets/images/avatars/image-ramsesmiron.webp',
              },
              username: 'ramsesmiron',
            },
          },
          {
            id: 4,
            content:
              "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            createdAt: '2 days ago',
            score: 2,
            replyingTo: 'ramsesmiron',
            user: {
              image: {
                png: './assets/images/avatars/image-juliusomo.png',
                webp: './assets/images/avatars/image-juliusomo.webp',
              },
              username: 'juliusomo',
            },
          },
        ],
      },
    ];

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
export class RequestService {
  constructor() {
    this.saveData();
  }

  private lastIndex: number = 5;

  private appComments$: BehaviorSubject<CommentI[]> = new BehaviorSubject<
    CommentI[]
  >(initComments);

  private currentComment$: BehaviorSubject<CommentI> =
    new BehaviorSubject<CommentI>(initComment);

  get getComments(): Observable<CommentI[]> {
    return this.appComments$.asObservable().pipe(first());
  }

  saveData() {
    const parsedData: string = JSON.stringify(this.appComments$.value);

    localStorage.setItem('comments', parsedData);
  }

  private findComment(id: number) {
    const comments = [...this.appComments$.value];

    let selectedComment: CommentI = initComment;

    for (const comment of comments) {
      if (comment.id === id) {
        selectedComment = comment;
      } else {
        const replies: CommentI[] = comment.replies || [];

        for (const reply of replies) {
          if (reply.id === id) {
            selectedComment = reply;
          }
        }
      }
    }
    return selectedComment;
  }

  private findSourceComment(id: number) {
    const comments = [...this.appComments$.value];

    let selectedComment: CommentI = initComment;

    for (const comment of comments) {
      if (comment.id === id) {
        selectedComment = comment;
      } else {
        const replies: CommentI[] = comment.replies || [];

        for (const reply of replies) {
          if (reply.id === id) {
            selectedComment = comment;
          }
        }
      }
    }
    return selectedComment;
  }

  getComment(id: number): Observable<CommentI> {
    const selectedComment = this.findComment(id);

    this.currentComment$.next(selectedComment);

    return this.currentComment$.asObservable().pipe(first());
  }

  addComment(replyingTo: number, commentData: any): Observable<CommentI> {
    const id = this.lastIndex++;

    const replyComment = this.findSourceComment(replyingTo);

    const newCommentPayload = {
      id,
      createdAt: 'few secs ago',
      ...commentData,
      score: 0,
    };

    replyComment.replies?.push(newCommentPayload);

    const data = [...this.appComments$.value].map((comment) => {
      if (comment.id !== replyComment.id) return comment;
      return replyComment;
    });

    this.appComments$.next(data);

    this.saveData();

    return this.currentComment$.asObservable().pipe(first());
  }

  deleteComment(id: number) {
    const sourceDeleteComment = this.findSourceComment(id);

    sourceDeleteComment.replies = sourceDeleteComment.replies?.filter(
      (comment: CommentI) => comment.id !== id
    );

    const data = [...this.appComments$.value].map((comment) => {
      if (comment.id !== sourceDeleteComment.id) return comment;
      return sourceDeleteComment;
    });

    this.appComments$.next(data);

    this.saveData();
  }

  updateComment(id: number, newContent: string, score?: number) {
    const comment = this.findComment(id);
    if (score) {
      comment.score = score;
      this.saveData();
    }
    if (comment.content === newContent) return;
    comment.content = newContent;

    const sourceComment = this.findSourceComment(id);
    sourceComment.replies = sourceComment.replies?.map(
      (commentItem: CommentI) => {
        if (commentItem.id !== comment.id) return commentItem;
        return comment;
      }
    );

    const data = [...this.appComments$.value].map((commentItem: CommentI) => {
      if (commentItem.id !== sourceComment.id) return commentItem;
      return sourceComment;
    });

    this.appComments$.next(data);

    this.saveData();
  }
}
