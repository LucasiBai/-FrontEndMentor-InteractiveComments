import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CommentsContainerComponent } from './pages/comments-container/comments-container.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { ScoreCounterComponent } from './components/score-counter/score-counter.component';
import { ReplyButtonComponent } from './components/reply-button/reply-button.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { EditButtonComponent } from './components/edit-button/edit-button.component';
import { CommentHeaderComponent } from './components/comment-header/comment-header.component';
import { CommentReplysListComponent } from './components/comment-replys-list/comment-replys-list.component';
import { TextInputCommentComponent } from './components/text-input-comment/text-input-comment.component';
import { FormsModule } from '@angular/forms';
import { AtReferenceComponent } from './components/at-reference/at-reference.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentsContainerComponent,
    CommentCardComponent,
    ScoreCounterComponent,
    ReplyButtonComponent,
    DeleteButtonComponent,
    EditButtonComponent,
    CommentHeaderComponent,
    CommentReplysListComponent,
    TextInputCommentComponent,
    AtReferenceComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}