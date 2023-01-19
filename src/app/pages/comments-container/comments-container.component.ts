import { Component, OnInit } from '@angular/core';

import { ApiRequestsService } from 'src/app/services/api-requests.service';

import { CommentI } from 'src/app/models/comment-i';
import { UserI } from 'src/app/models/user-i';
import { DataI } from 'src/app/models/data-i';
import { UserProviderService } from 'src/app/services/user-provider.service';

@Component({
  selector: 'app-comments-container',
  templateUrl: './comments-container.component.html',
  styleUrls: ['./comments-container.component.css'],
})
export class CommentsContainerComponent implements OnInit {
  comment_list!: CommentI[];
  currentUser!: UserI;

  constructor(
    private apiRequest: ApiRequestsService,
    private userProvider: UserProviderService
  ) {}

  ngOnInit() {
    this.userProvider.currentUserObservable.subscribe((res: UserI) => {
      this.currentUser = res;
    });
    this.getComments();
  }

  private getComments(): void {
    this.apiRequest.getData().subscribe((res: DataI) => {
      this.comment_list = res.comments;
    });
  }
}
