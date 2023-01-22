import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reply-button',
  templateUrl: './reply-button.component.html',
  styleUrls: ['./reply-button.component.css'],
})
export class ReplyButtonComponent {
  reply: boolean = false;

  @Output() replyCommentEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>(this.reply);

  replyComment() {
    this.reply = !this.reply;
    this.replyCommentEvent.emit(this.reply);
  }
}
