import { TestBed } from '@angular/core/testing';
import { CommentI } from '../models/comment-i';
import { RequestService } from './request.service';

fdescribe('Test Request Service', () => {
  let service: RequestService;

  beforeEach(() => {
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

    it('Should return no existent comment', () => {
      service.getComment(20).subscribe((comment: CommentI) => {
        expect(comment.id).toBeFalsy();
      });
    });
  });
});
