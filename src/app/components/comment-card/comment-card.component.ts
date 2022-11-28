import { Component, Input } from '@angular/core';

import { CommentI } from 'src/app/models/comment-i';
import { ApiRequestsService } from 'src/app/services/api-requests.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css'],
})
export class CommentCardComponent {
  @Input() comment!: CommentI;
  @Input() currentUser!: string;
  @Input() replyTo!: string;

  isCreator: boolean = false;

  constructor(private apiRequest: ApiRequestsService) {}

  ngOnInit() {
    this.isCreator = this.comment.user.username === this.currentUser;
  }
}
