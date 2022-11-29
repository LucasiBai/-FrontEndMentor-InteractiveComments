import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment-header',
  templateUrl: './comment-header.component.html',
  styleUrls: ['./comment-header.component.css'],
})
export class CommentHeaderComponent {
  @Input() userImg!: string;
  @Input() userName!: string;
  @Input() createdAt!: string;
  @Input() isCreator!: boolean;
}
