import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs';
import { CommentI } from '../../data/models/comment-i';
import { UserI } from '../../data/models/user-i';
import { RequestService } from '../../data/services/request.service';
import { ReplyActionService } from './reply-action.service';

const mockUser: UserI = {
  image: {
    png: './assets/images/avatars/image-ramsesmiron.png',
    webp: './assets/images/avatars/image-ramsesmiron.webp',
  },
  username: 'ramsesmiron',
};

describe('Test Reply action Service', () => {
  let service: ReplyActionService;

  beforeEach(() => {
    service = TestBed.inject(ReplyActionService);
  });

  it('Should start with second comment', () => {
    service.replyingTo
      .pipe(first())
      .subscribe((comment: CommentI) => expect(comment.id).toEqual(2));
  });

  describe('Test replyTo()', () => {
    it('Should update current replying user to entered id', () => {
      service.replyTo(4);

      service.replyingTo
        .pipe(first())
        .subscribe((comment: CommentI) => expect(comment.id).toEqual(4));
    });

    it('Should change comment if is already replying it', () => {
      service.replyTo(4);

      service.replyTo(4);

      service.replyingTo
        .pipe(first())
        .subscribe((comment: CommentI) => expect(comment.id).toEqual(0));
    });
  });

  describe('Test sendComment()', () => {
    let dataService: RequestService;
    beforeEach(() => {
      dataService = TestBed.inject(RequestService);
    });

    it('Should create comment', () => {
      service.sendComment('Test comment', mockUser);

      dataService
        .getComment(5)
        .pipe(first())
        .subscribe((comment: CommentI) => {
          expect(comment.user).toEqual(mockUser);
          expect(comment.content).toEqual('Test comment');
        });
    });

    it('Should update replyingTo to 0 ', () => {
      service.sendComment('Test comment', mockUser);

      service.replyingTo
        .pipe(first())
        .subscribe((comment: CommentI) => expect(comment.id).toEqual(0));
    });
  });
});
