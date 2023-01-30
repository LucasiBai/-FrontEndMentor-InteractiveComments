import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserI } from '../../data/models/user-i';

const initUser = {
  image: {
    png: './images/avatars/image-juliusomo.png',
    webp: './images/avatars/image-juliusomo.webp',
  },
  username: 'juliusomo',
};

@Injectable({
  providedIn: 'root',
})
export class UserProviderService {
  constructor() {}

  private currentUser$: BehaviorSubject<UserI> = new BehaviorSubject<UserI>(
    initUser
  );

  get currentUser(): Observable<UserI> {
    return this.currentUser$.asObservable();
  }

  set setCurrentUser(userData: UserI) {
    this.currentUser$.next(userData);
  }
}
