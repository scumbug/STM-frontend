import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  headers = new HttpHeaders().set('Authorization', `${this.auth.sendToken()}`);

  // GET /users

  // GET /users/agents
  async getAllAgents(): Promise<User[]> {
    return await this.http
      .get<User[]>('/api/users/agents', {
        headers: this.headers,
      })
      .toPromise();
  }

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
