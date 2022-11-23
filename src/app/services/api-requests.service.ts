import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CommentI } from '../interfaces/comment-i';
import { DataI } from '../interfaces/data-i';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestsService {
  constructor(private httpClient: HttpClient) {}

  public getData() {
    return this.httpClient.get('./assets/data.json');
  }
}
