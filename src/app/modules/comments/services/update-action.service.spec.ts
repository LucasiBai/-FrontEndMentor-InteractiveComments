import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs';
import { CommentI } from '../../data/models/comment-i';
import { RequestService } from '../../data/services/request.service';
import { UpdateActionService } from './update-action.service';

describe('Test Comment Update Action', () => {
  let service: UpdateActionService;

  beforeEach(() => {
    service = TestBed.inject(UpdateActionService);
  });

  describe('Test update()', () => {
    let dataService: RequestService;

    beforeEach(() => {
      dataService = TestBed.inject(RequestService);
    });

    it('Should update comment', () => {
      const commentId: number = 3;
      const newContent: string = 'New test content';

      service.update(commentId, newContent);

      dataService
        .getComment(3)
        .pipe(first())
        .subscribe((comment: CommentI) =>
          expect(comment.content).toEqual(newContent)
        );
    });

    it('Should update comment with score', () => {
      const commentId: number = 3;
      const newContent: string = 'New test content';
      const newScore: number = 25;

      service.update(commentId, newContent, newScore);

      dataService
        .getComment(3)
        .pipe(first())
        .subscribe((comment: CommentI) => {
          expect(comment.content).toEqual(newContent);
          expect(comment.score).toEqual(newScore);
        });
    });
  });
});
