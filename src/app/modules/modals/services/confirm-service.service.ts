import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfirmI } from '../models/confirm-i';

const initConfirm: ConfirmI = {
  isConfirming: false,
  action: () => {},
  header: '',
  content: '',
};

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  private isConfirming$: BehaviorSubject<ConfirmI> =
    new BehaviorSubject<ConfirmI>(initConfirm);

  get isConfirming(): Observable<ConfirmI> {
    return this.isConfirming$.asObservable();
  }

  closeModal() {
    this.isConfirming$.next(initConfirm);
  }

  confirm(header: string, content: string, action: Function) {
    const confirmData: ConfirmI = {
      isConfirming: true,
      action,
      header,
      content,
    };

    this.isConfirming$.next(confirmData);
  }
}
