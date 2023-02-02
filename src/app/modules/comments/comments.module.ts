import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentRepliesListComponent } from './components/comment-replies-list/comment-replies-list.component';
import { InputCommentComponent } from './components/input-comment/input-comment.component';

@NgModule({
  declarations: [CommentCardComponent, CommentListComponent, CommentRepliesListComponent, InputCommentComponent],
  imports: [CommonModule, CommentsRoutingModule],
  exports: [CommentListComponent],
})
export class CommentsModule {}
