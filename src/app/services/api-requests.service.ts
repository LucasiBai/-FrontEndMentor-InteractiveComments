import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataI } from '../models/data-i';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestsService {
  constructor(private httpClient: HttpClient) {}

  public getData() {
    return this.httpClient.get<DataI>('./assets/data.json');
  }
}
