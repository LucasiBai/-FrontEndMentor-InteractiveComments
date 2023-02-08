import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentsRoutingModule } from './comments-routing.module';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentRepliesListComponent } from './components/comment-replies-list/comment-replies-list.component';
import { InputCommentComponent } from './components/input-comment/input-comment.component';
import { UserIconComponent } from './components/user-icon/user-icon.component';
import { CommentContentComponent } from './components/comment-content/comment-content.component';
import { ScoreCounterComponent } from './components/score-counter/score-counter.component';
import { ReplyButtonComponent } from './components/buttons/reply-button/reply-button.component';
import { DeleteButtonComponent } from './components/buttons/delete-button/delete-button.component';
import { EditButtonComponent } from './components/buttons/edit-button/edit-button.component';

@NgModule({
  declarations: [
    CommentCardComponent,
    CommentListComponent,
    CommentRepliesListComponent,
    InputCommentComponent,
    UserIconComponent,
    CommentContentComponent,
    ScoreCounterComponent,
    ReplyButtonComponent,
    DeleteButtonComponent,
    EditButtonComponent,
  ],
  imports: [CommonModule, CommentsRoutingModule, ReactiveFormsModule],
  exports: [CommentListComponent],
})
export class CommentsModule {}
