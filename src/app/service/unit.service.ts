import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Unit } from '../model/unit.model';
import { AuthService } from './auth.service';

@Injectable()
export class UnitService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  headers = new HttpHeaders().set('Authorization', `${this.auth.sendToken()}`);

  // Unit operations
  async getUnits(propertyId: number): Promise<Unit[]> {
    return await this.http
      .get<Unit[]>(`/api/properties/${propertyId}/unit`, {
        headers: this.headers,
      })
      .toPromise();
  }

  async getFreeUnits(propertyId: number): Promise<Unit[]> {
    return await this.http
      .get<Unit[]>(`/api/properties/${propertyId}/unit/free`, {
        headers: this.headers,
      })
      .toPromise();
  }

  async getUnit(unitId: number): Promise<Unit> {
    return await this.http
      .get<Unit>(`/api/units/${unitId}`, { headers: this.headers })
      .toPromise();
  }

  async getAllUnits(): Promise<Unit[]> {
    return await this.http
      .get<Unit[]>(`/api/units`, { headers: this.headers })
      .toPromise();
  }

  async bulkAddUnits(payload: Unit[]): Promise<Unit[]> {
    console.log(payload);
    return await this.http
      .post<Unit[]>('/api/units/bulk', payload, { headers: this.headers })
      .toPromise();
  }

  async deleteUnit(id: number): Promise<any> {
    return await this.http
      .delete<any>(`/api/units/${id}`, { headers: this.headers })
      .toPromise();
  }

  async editUnit(payload: Unit): Promise<Unit> {
    return await this.http
      .put<Unit>(`/api/units`, payload, { headers: this.headers })
      .toPromise();
  }
}
