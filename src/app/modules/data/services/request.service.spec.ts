import { TestBed } from '@angular/core/testing';
import { CommentI } from '../models/comment-i';
import { RequestService } from './request.service';

describe('Test Request Service', () => {
  let service: RequestService;

  beforeEach(() => {
    localStorage.removeItem('comments');
    service = TestBed.inject(RequestService);
  });

  describe('Test saveData()', () => {
    it('Should save current comments in local storage', () => {
      localStorage.removeItem('comments');

      service.saveData();

      const localComments = localStorage.getItem('comments');

      expect(localComments).toBeTruthy();

      service.getComments.subscribe((comments: CommentI[]) => {
        expect(localComments).toEqual(JSON.stringify(comments));
      });
    });
  });

  describe('Test getComments()', () => {
    it('Should return a Observable with current comments', () => {
      service.getComments.subscribe((comment: CommentI[]) =>
        expect(comment).toBeTruthy()
      );
    });
  });

  describe('Test getComment()', () => {
    it('Should return entered comment', () => {
      service.getComment(2).subscribe((comment: CommentI) => {
        expect(comment).toBeTruthy();
        expect(comment.id).toEqual(2);
      });
    });

    it('Should return entered reply comment', () => {
      service.getComment(4).subscribe((comment: CommentI) => {
        expect(comment).toBeTruthy();
        expect(comment.id).toEqual(4);
      });
    });

    it('Should return no existent comment', () => {
      service.getComment(20).subscribe((comment: CommentI) => {
        expect(comment.id).toBeFalsy();
      });
    });
  });

  describe('Test addComment()', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('Should reply to comment and create comment in cache', () => {
      const commentPayload: { replyingTo: number; commentData: any } = {
        replyingTo: 1,
        commentData: {
          replyingTo: 'TestUser',
          user: {
            image: {
              png: './assets/images/avatars/image-ramsesmiron.png',
              webp: './assets/images/avatars/image-ramsesmiron.webp',
            },
            username: 'ramsesmiron',
          },
          content: 'Test comment content',
        },
      };

      service
        .addComment(commentPayload.replyingTo, commentPayload.commentData)
        .subscribe((comment: CommentI) => {
          expect(comment.id);
        });

      service.getComment(5).subscribe((comment: CommentI) => {
        expect(comment.id).toEqual(5);
        expect(comment.content).toEqual(commentPayload.commentData.content);
      });
    });

    it('Should reply to reply and create comment in source comment', () => {
      const commentPayload: { replyingTo: number; commentData: any } = {
        replyingTo: 4,
        commentData: {
          replyingTo: 'TestUser',
          user: {
            image: {
              png: './assets/images/avatars/image-ramsesmiron.png',
              webp: './assets/images/avatars/image-ramsesmiron.webp',
            },
            username: 'ramsesmiron',
          },
          content: 'Test comment content',
        },
      };

      service
        .addComment(commentPayload.replyingTo, commentPayload.commentData)
        .subscribe((comment: CommentI) => {
          expect(comment.id);
        });

      service.getComment(5).subscribe((comment: CommentI) => {
        expect(comment.id).toEqual(5);
        expect(comment.content).toEqual(commentPayload.commentData.content);
      });
    });

    it('Should save comment in localStorage', () => {
      const commentPayload: { replyingTo: number; commentData: any } = {
        replyingTo: 1,
        commentData: {
          replyingTo: 'TestUser',
          user: {
            image: {
              png: './assets/images/avatars/image-ramsesmiron.png',
              webp: './assets/images/avatars/image-ramsesmiron.webp',
            },
            username: 'ramsesmiron',
          },
          content: 'Test comment content',
        },
      };

      service
        .addComment(commentPayload.replyingTo, commentPayload.commentData)
        .subscribe((comment: CommentI) => {
          expect(comment.id);
        });

      const localData = localStorage.getItem('comments');

      service.getComments.subscribe((comments: CommentI[]) => {
        expect(localData).toEqual(JSON.stringify(comments));
      });
    });
  });

  describe('Test deleteComment()', () => {
    it('Should delete comment and update cache', () => {
      service.deleteComment(2);

      service
        .getComment(2)
        .subscribe((comment: CommentI) => expect(comment.id).toBeFalsy());
    });

    it('Should delete reply comment and update cache', () => {
      service.deleteComment(3);

      service
        .getComment(3)
        .subscribe((comment: CommentI) => expect(comment.id).toBeFalsy());
    });

    it('Should delete comment and update localStorage', () => {
      localStorage.clear();

      service.deleteComment(3);

      const localData = localStorage.getItem('comments');

      service.getComments.subscribe((comments: CommentI[]) =>
        expect(localData).toEqual(JSON.stringify(comments))
      );
    });
  });

  describe('Test updateComment()', () => {
    it('Should update comment content', () => {
      const commentPayload = {
        id: 1,
        content: 'Update comment content',
      };

      service.updateComment(commentPayload.id, commentPayload.content);

      service
        .getComment(commentPayload.id)
        .subscribe((comment: CommentI) =>
          expect(comment.content).toEqual(commentPayload.content)
        );
    });
    it('Should update comment score', () => {
      const commentPayload = {
        id: 1,
        content: 'Update comment content',
        score: 10,
      };

      service.updateComment(
        commentPayload.id,
        commentPayload.content,
        commentPayload.score
      );

      service.getComment(commentPayload.id).subscribe((comment: CommentI) => {
        expect(comment.content).toEqual(commentPayload.content);
        expect(comment.score).toEqual(commentPayload.score);
      });
    });
    it('Should update reply comment content', () => {
      const commentPayload = {
        id: 3,
        content: 'Update comment content',
      };

      service.updateComment(commentPayload.id, commentPayload.content);

      service
        .getComment(commentPayload.id)
        .subscribe((comment: CommentI) =>
          expect(comment.content).toEqual(commentPayload.content)
        );
    });
    it('Should update reply comment score', () => {
      const commentPayload = {
        id: 2,
        content: 'Update comment content',
        score: 10,
      };

      service.updateComment(
        commentPayload.id,
        commentPayload.content,
        commentPayload.score
      );

      service.getComment(commentPayload.id).subscribe((comment: CommentI) => {
        expect(comment.content).toEqual(commentPayload.content);
        expect(comment.score).toEqual(commentPayload.score);
      });
    });

    it('Should update comment and update localStorage', () => {
      localStorage.clear();

      const commentPayload = {
        id: 2,
        content: 'Update comment content',
        score: 10,
      };

      service.updateComment(
        commentPayload.id,
        commentPayload.content,
        commentPayload.score
      );

      const localData: string = localStorage.getItem('comments') || '';

      service.getComments.subscribe((comments: CommentI[]) =>
        expect(localData).toEqual(JSON.stringify(comments))
      );
    });
  });
});
