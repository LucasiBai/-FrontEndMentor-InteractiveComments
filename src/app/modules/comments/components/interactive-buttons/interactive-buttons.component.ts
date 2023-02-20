import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-interactive-buttons',
  templateUrl: './interactive-buttons.component.html',
  styleUrls: ['./interactive-buttons.component.css'],
})
export class InteractiveButtonsComponent {
  @Input() platform!: string;
  @Input() initCount!: number;
  @Input() ownComment!: boolean;

  @Output() replyEvent: EventEmitter<null> = new EventEmitter<null>();
  @Output() deleteEvent: EventEmitter<null> = new EventEmitter<null>();
  @Output() editEvent: EventEmitter<null> = new EventEmitter<null>();
  @Output() countEvent: EventEmitter<number> = new EventEmitter<number>();

  emitScore(count: number) {
    this.countEvent.emit(count);
  }
  emitReply() {
    this.replyEvent.emit();
  }
  emitDelete() {
    this.deleteEvent.emit();
  }
  emitEdit() {
    this.editEvent.emit();
  }
}
