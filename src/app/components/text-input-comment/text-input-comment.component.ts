import { Component, Input } from '@angular/core';
import { UserI } from 'src/app/models/user-i';

@Component({
  selector: 'app-text-input-comment',
  templateUrl: './text-input-comment.component.html',
  styleUrls: ['./text-input-comment.component.css'],
})
export class TextInputCommentComponent {
  @Input() currentUser!: UserI;
}
