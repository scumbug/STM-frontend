import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Unit } from '../model/unit.model';

@Injectable()
export class UnitService {
  constructor(private http: HttpClient) {}

  // Unit operations
  async getUnits(propertyId: number): Promise<Unit[]> {
    return await this.http
      .get<Unit[]>(`/api/properties/${propertyId}/unit`)
      .toPromise();
  }

  async bulkAddUnits(payload: Unit[]): Promise<Unit[]> {
    console.log(payload);
    return await this.http.post<Unit[]>('/api/units/bulk', payload).toPromise();
  }

  async deleteUnit(id: number): Promise<any> {
    return await this.http.delete<any>(`/api/units/${id}`).toPromise();
  }
}
