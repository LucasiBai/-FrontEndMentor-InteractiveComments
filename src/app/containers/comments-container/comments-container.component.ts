import { Component } from '@angular/core';

import { ApiRequestsService } from 'src/app/services/api-requests.service';

import { CommentI } from 'src/app/models/comment-i';

@Component({
  selector: 'app-comments-container',
  templateUrl: './comments-container.component.html',
  styleUrls: ['./comments-container.component.css'],
})
export class CommentsContainerComponent {
  comment_list!: CommentI[];

  constructor(private apiRequest: ApiRequestsService) {}

  ngOnInit() {
    this.getComments();
  }

  private getComments(): void {
    this.apiRequest.getData().subscribe((res: any) => {
      this.comment_list = res.comments;
    });
  }
}
