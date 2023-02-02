import { Component, OnInit } from '@angular/core';
import { UserProviderService } from 'src/app/modules/auth/services/user-provider.service';
import { UserI } from 'src/app/modules/data/models/user-i';

@Component({
  selector: 'app-input-comment',
  templateUrl: './input-comment.component.html',
  styleUrls: ['./input-comment.component.css'],
})
export class InputCommentComponent implements OnInit {
  constructor(private _user: UserProviderService) {}

  currentUser!: UserI | undefined;

  ngOnInit(): void {
    this._user.currentUser.subscribe(
      (user: UserI) => (this.currentUser = user)
    );
  }
}
