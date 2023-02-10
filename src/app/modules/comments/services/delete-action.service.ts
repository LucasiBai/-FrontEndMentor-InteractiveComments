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

  askForDelete(id: number) {
    const headerModal: string = 'Delete comment';

    const contentModal: string =
      "Are you sure you want to delete this comment? This will remove the comment and can't be undone.";

    this._confirm.confirm(headerModal, contentModal, () => {
      this.delete(id);
    });
  }

  delete(id: number) {
    this._data.deleteComment(id);
  }
}
