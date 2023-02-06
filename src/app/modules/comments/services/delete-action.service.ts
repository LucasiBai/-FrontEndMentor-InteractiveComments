import { Injectable } from '@angular/core';
import { RequestService } from '../../data/services/request.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteActionService {
  constructor(private _data: RequestService) {}

  delete(id: number) {
    confirm('Are you sure?') && this._data.deleteComment(id);
  }
}
