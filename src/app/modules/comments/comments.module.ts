import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentCardComponent } from './components/comment-card/comment-card.component';

@NgModule({
  declarations: [CommentCardComponent],
  imports: [CommonModule, CommentsRoutingModule],
  exports: [CommentCardComponent],
})
export class CommentsModule {}
