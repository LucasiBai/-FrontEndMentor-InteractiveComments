import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReplyActionService } from 'src/app/modules/comments/services/reply-action.service';
import { UserProviderService } from 'src/app/modules/auth/services/user-provider.service';
import { UserI } from 'src/app/modules/data/models/user-i';

@Component({
  selector: 'app-input-comment',
  templateUrl: './input-comment.component.html',
  styleUrls: ['./input-comment.component.css'],
})
export class InputCommentComponent implements OnInit {
  constructor(
    private _user: UserProviderService,
    private _fb: FormBuilder,
    private _replyAction: ReplyActionService
  ) {}

  @ViewChild('commentInput', { static: true }) commentInput!: ElementRef;

  currentUser!: UserI;

  commentForm!: FormGroup;

  ngOnInit(): void {
    this._user.currentUser.subscribe(
      (user: UserI) => (this.currentUser = user)
    );

    this.commentForm = this.initForm();

    this.commentInput.nativeElement.focus();
  }

  initForm(): FormGroup {
    return this._fb.group({
      comment: ['', [Validators.minLength(3)]],
    });
  }

  sendComment() {
    const { comment } = this.commentForm.value;
    const valid = comment.length > 0 && this.commentForm.get('comment')?.valid;

    if (valid) {
      this._replyAction.sendComment(comment, this.currentUser);

      this.commentForm = this.initForm();
    }
  }
}
