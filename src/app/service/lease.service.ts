import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lease } from '../model/lease.model';
import { LeaseWrapper } from '../model/leasewrapper.model';
import { RentHistory } from '../model/rentHistory.model';
import { Tenant, TenantStatus } from '../model/tenant.model';
import { AuthService } from './auth.service';
import { TenantService } from './tenant.service';

@Injectable()
export class LeaseService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private tenantService: TenantService
  ) {}
  headers = new HttpHeaders().set('Authorization', `${this.auth.sendToken()}`);

  // Lease operations (read only)
  async getLease(unitId: number): Promise<Lease> {
    try {
      const lease = await this.http
        .get<Lease>(`/api/leases/unit/${unitId}`, {
          headers: this.headers,
          observe: 'response',
        })
        .toPromise();
      const tenant: Tenant = await this.tenantService.getTenant(
        lease.body.tenantId
      );
      if (tenant.tenantStatus == TenantStatus.PENDING) {
        lease.body.tenantName =
          (await this.tenantService.getTenantName(tenant.userId)) +
          ' (' +
          TenantStatus.PENDING +
          ') ';
      } else {
        lease.body.tenantName = await this.tenantService.getTenantName(
          tenant.userId
        );
      }
      return lease.body as Lease;
    } catch (error) {
      if (error.status == 404) {
        return null;
      }
    }
  }
  async convertTenant(payload: LeaseWrapper): Promise<Lease> {
    return await this.http
      .post<Lease>('/api/leases', payload, {
        headers: this.headers,
      })
      .toPromise();
  }

  async getHistoricalRent(unitId: number): Promise<RentHistory[]> {
    return await this.http
      .get<RentHistory[]>(`/api/leases/historical/${unitId}`, {
        headers: this.headers,
      })
      .toPromise();
  }
}
