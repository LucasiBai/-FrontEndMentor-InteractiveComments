import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentI } from 'src/app/modules/data/models/comment-i';

@Component({
  selector: 'app-comment-content',
  templateUrl: './comment-content.component.html',
  styleUrls: ['./comment-content.component.css'],
})
export class CommentContentComponent implements OnInit {
  constructor(private _fb: FormBuilder) {}

  @Input() comment!: any;
  @Input() updating!: boolean;

  @Output() updateContentEvent: EventEmitter<string> =
    new EventEmitter<string>();

  commentForm!: FormGroup;

  ngOnInit() {
    this.commentForm = this.initForm();
  }

  initForm(): FormGroup {
    return this._fb.group({
      content: [this.comment.content, [Validators.minLength(5)]],
    });
  }

  emitContent() {
    this.updateContentEvent.emit(this.commentForm.value.content);
  }
}
