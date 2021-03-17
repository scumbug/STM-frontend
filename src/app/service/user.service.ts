import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  // TODO grab token
  headers = new HttpHeaders().set('Authorization', 'Bearer 12345');

  // GET /users

  // POST /users
  async addUser(payload): Promise<User> {
    const res = await this.http
      .post<User>('/users', payload, {
        headers: this.headers,
        observe: 'response',
      })
      .toPromise();

    if (res.status == 200) return (res as unknown) as User;
    else return null;
  }

  // PUT /users

  // DELETE /users
}
