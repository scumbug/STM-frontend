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
}
