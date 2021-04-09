import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tenant, TenantStatus } from '../model/tenant.model';
import { TenantWrapper } from '../model/tenantwrapper.model';
import { User } from '../model/user.model';

@Injectable()
export class TenantService {
  constructor(private http: HttpClient) {}

  // GET /tenants?tenantStatus
  async getTenants(status: TenantStatus): Promise<TenantWrapper[]> {
    const params = new HttpParams().set('tenantStatus', status);
    let res = await this.http
      .get<TenantWrapper[]>('/api/tenants/aggregate', { params })
      .toPromise();
    return res;
  }

  // get tenant name
  async getTenantName(userId: number): Promise<String> {
    const res = await this.http.get<User>(`/api/users/${userId}`).toPromise();
    return await res.name;
  }
}
