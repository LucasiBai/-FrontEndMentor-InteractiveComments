import { Injectable } from '@angular/core';
import { RequestService } from '../../data/services/request.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateActionService {
  constructor(private _data: RequestService) {}

  update(id: number, payload: string, score?: number) {
    this._data.updateComment(id, payload, score);
  }
}
