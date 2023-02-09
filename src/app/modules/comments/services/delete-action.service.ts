import { Injectable } from '@angular/core';
import { RequestService } from '../../data/services/request.service';
import { ConfirmService } from '../../modals/services/confirm-service.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteActionService {
  constructor(
    private _data: RequestService,
    private _confirm: ConfirmService
  ) {}

  delete(id: number) {
    this._confirm.confirm('hi', 'delete comment');
    // this._data.deleteComment(id);
  }
}
