import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../model/property.model';
import { AuthService } from './auth.service';

@Injectable()
export class PropertyService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  headers = new HttpHeaders().set('Authorization', `${this.auth.sendToken()}`);

  async getProperties(): Promise<Property[]> {
    return await this.http
      .get<Property[]>('/api/properties', { headers: this.headers })
      .toPromise();
  }

  async addProperties(payload: Property): Promise<Property> {
    return await this.http
      .post<Property>('/api/properties', payload, { headers: this.headers })
      .toPromise();
  }

  async updateProperties(payload: Property): Promise<Property> {
    return await this.http
      .put<Property>(`/api/properties`, payload, { headers: this.headers })
      .toPromise();
  }

  async deleteProperties(id: number): Promise<any> {
    return await this.http
      .delete<any>(`/api/properties/${id}`, { headers: this.headers })
      .toPromise();
  }

  async getLeaseUnitById(id: number): Promise<any> {
    return await this.http
      .get<any>(`/api/properties/${id}/leasecount`, { headers: this.headers })
      .toPromise();
  }
}
