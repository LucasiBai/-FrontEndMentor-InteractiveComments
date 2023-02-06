import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommentI } from '../../data/models/comment-i';
import { UserI } from '../../data/models/user-i';
import { RequestService } from '../../data/services/request.service';

const initComment = {
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
};

const emptyComment = {
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
    if (id === this.replyingTo$.value.id) {
      this.replyingTo$.next(initComment);
    } else {
      this._data
        .getComment(id)
        .subscribe((comment) => this.replyingTo$.next(comment));
    }
  }

  sendComment(content: string, user: UserI) {
    const replyingTo = this.replyingTo$.value;

    const formatComment = {
      content,
      replyingTo: replyingTo.user.username,
      user,
    };

    this._data
      .addComment(replyingTo.id || 0, formatComment)
      .subscribe((res) => {
        this.replyingTo$.next(emptyComment);
      });
  }
}
