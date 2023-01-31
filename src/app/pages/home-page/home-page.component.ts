import { Component, OnInit } from '@angular/core';
import { CommentI } from 'src/app/modules/data/models/comment-i';
import { RequestService } from 'src/app/modules/data/services/request.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(private _data: RequestService) {}

  comment_list!: CommentI[];

  ngOnInit() {
    this._data.getComments.subscribe(
      (comments: CommentI[]) => (this.comment_list = comments)
    );
  }
}
