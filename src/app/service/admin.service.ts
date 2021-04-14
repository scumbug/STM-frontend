import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  headers = new HttpHeaders().set('Authorization', `${this.auth.sendToken()}`);

  async getEmailTemplate(): Promise<any> {
    return await this.http
      .get<any>('/api/email-template', { headers: this.headers })
      .toPromise();
  }

  async updateEmailTemplate(payload): Promise<void> {
    return await this.http
      .post<any>('/api/update-template', payload, { headers: this.headers })
      .toPromise();
  }
}
