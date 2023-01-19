import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserI } from '../models/user-i';
import { DataI } from '../models/data-i';
import { ApiRequestsService } from './api-requests.service';

@Injectable({
  providedIn: 'root',
})
export class UserProviderService {
  private currentUser$: BehaviorSubject<UserI> = new BehaviorSubject<UserI>({
    image: {
      png: '',
      webp: '',
    },
    username: '',
  });

  get currentUserObservable(): Observable<UserI> {
    return this.currentUser$.asObservable();
  }

  constructor(private request: ApiRequestsService) {
    this.request.getData().subscribe((res: DataI) => {
      const { currentUser } = res;

      this.currentUser$.next(currentUser);
    });
  }
}
