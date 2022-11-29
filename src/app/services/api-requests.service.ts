import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestsService {
  constructor(private httpClient: HttpClient) {}

  public getData() {
    return this.httpClient.get('./assets/data.json');
  }
}
