import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../model/property.model';

@Injectable()
export class PropertyService {
  constructor(private http: HttpClient) {}

  async getProperties(): Promise<Property[]> {
    return await this.http.get<Property[]>('/api/properties').toPromise();
  }

  async addProperties(payload: Property): Promise<Property> {
    return await this.http
      .post<Property>('/api/properties', payload)
      .toPromise();
  }

  async updateProperties(payload: Property): Promise<Property> {
    return await this.http
      .put<Property>(`/api/properties`, payload)
      .toPromise();
  }

  async deleteProperties(id: number): Promise<any> {
    return await this.http.delete<any>(`/api/properties/${id}`).toPromise();
  }
}
