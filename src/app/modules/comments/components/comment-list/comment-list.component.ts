import { Component, Input, OnInit } from '@angular/core';
import { CommentI } from 'src/app/modules/data/models/comment-i';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent implements OnInit {
  @Input() comment_list!: CommentI[];

  ngOnInit() {
    if (this.comment_list === undefined) {
      this.comment_list = [];
    }
  }
}
