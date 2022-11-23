import { Component } from '@angular/core';

import { ApiRequestsService } from 'src/app/services/api-requests.service';

import { CommentI } from 'src/app/interfaces/comment-i';
import { DataI } from 'src/app/interfaces/data-i';

@Component({
  selector: 'app-comments-container',
  templateUrl: './comments-container.component.html',
  styleUrls: ['./comments-container.component.css'],
})
export class CommentsContainerComponent {
  comments_list!: CommentI[];

  constructor(private apiRequest: ApiRequestsService) {}

  ngOnInit() {
    this.getComments();
  }

  private getComments(): void {
    this.apiRequest.getData().subscribe((res: any) => {
      this.comments_list = res.comments;
    });
  }
}
