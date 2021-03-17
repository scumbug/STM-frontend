import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  async testUsers(): Promise<any> {
    return await this.http.get<any>('/users').toPromise();
  }
}
