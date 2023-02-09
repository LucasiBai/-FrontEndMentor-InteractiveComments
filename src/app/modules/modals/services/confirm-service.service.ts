import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  private isConfirming$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  get isConfirming(): Observable<boolean> {
    return this.isConfirming$.asObservable();
  }

  closeModal() {
    this.isConfirming$.next(false);
  }

  confirm(header: string, content: string) {
    this.isConfirming$.next(true);
  }
}
