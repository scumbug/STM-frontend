import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lease } from '../model/lease.model';

@Injectable()
export class LeaseService {
  constructor(private http: HttpClient) {}

  // Lease operations (read only)
  async getLease(unitId: number): Promise<Lease> {
    return null;
  }
}
