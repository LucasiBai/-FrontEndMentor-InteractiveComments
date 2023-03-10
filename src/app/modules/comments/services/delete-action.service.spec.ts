import { TestBed, waitForAsync } from '@angular/core/testing';
import { first } from 'rxjs';
import { DataModule } from '../../data/data.module';
import { CommentI } from '../../data/models/comment-i';
import { RequestService } from '../../data/services/request.service';
import { ModalsModule } from '../../modals/modals.module';
import { ConfirmI } from '../../modals/models/confirm-i';
import { ConfirmService } from '../../modals/services/confirm-service.service';
import { DeleteActionService } from './delete-action.service';

describe('Test Delete action Service', () => {
  let service: DeleteActionService;

  beforeEach(() => {
    service = TestBed.inject(DeleteActionService);
  });

  describe('Test delete()', () => {
    let dataService: RequestService;

    beforeEach(() => {
      dataService = TestBed.inject(RequestService);
    });

    it('Should delete entered reply comment id', () => {
      dataService.getComment(3).subscribe((comment: CommentI) => {
        expect(comment).toBeTruthy();
      });

      service.delete(3);

      dataService.getComment(3).subscribe((comment: CommentI) => {
        expect(comment.id).toBeFalsy();
      });
    });
  });

  describe('Test askForDelete()', () => {
    let confirmService: ConfirmService;

    beforeEach(() => {
      confirmService = TestBed.inject(ConfirmService);
    });

    it('Should open modal confirm form', () => {
      confirmService.isConfirming
        .pipe(first())
        .subscribe((confirm: ConfirmI) => {
          expect(confirm.isConfirming).toBeFalse();
        });

      service.askForDelete(2);

      confirmService.isConfirming
        .pipe(first())
        .subscribe((confirm: ConfirmI) => {
          expect(confirm.isConfirming).toBeTrue();
        });
    });
  });
});
