import { Component, Input, OnInit } from '@angular/core';
import { UserI } from 'src/app/models/user-i';
import { UserProviderService } from 'src/app/services/user-provider.service';

@Component({
  selector: 'app-text-input-comment',
  templateUrl: './text-input-comment.component.html',
  styleUrls: ['./text-input-comment.component.css'],
})
export class TextInputCommentComponent implements OnInit {
  currentUser!: UserI;

  constructor(private _user: UserProviderService) {}

  ngOnInit(): void {
    this._user.currentUserObservable.subscribe(
      (res: UserI) => (this.currentUser = res)
    );
  }

  comment: any = { message: '' };
  uploadComment() {
    console.log(this.comment.message);
  }
}
