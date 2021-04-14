import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tenant, TenantStatus } from '../model/tenant.model';
import { TenantWrapper } from '../model/tenantwrapper.model';
import { User } from '../model/user.model';
import { AuthService } from './auth.service';

@Injectable()
export class TenantService {
  constructor(private http: HttpClient, private auth: AuthService) {}
  headers = new HttpHeaders().set('Authorization', `${this.auth.sendToken()}`);

  // GET /tenants?tenantStatus
  async getTenants(status?: TenantStatus): Promise<TenantWrapper[]> {
    const params = new HttpParams().set('tenantStatus', status);
    if (status == null) {
      let res = await this.http
        .get<TenantWrapper[]>('/api/tenants/aggregate', {
          headers: this.headers,
        })
        .toPromise();
      return res;
    } else {
      let res = await this.http
        .get<TenantWrapper[]>('/api/tenants/aggregate', {
          params,
          headers: this.headers,
        })
        .toPromise();
      return res;
    }
  }

  // get tenant name
  async getTenantName(userId: number): Promise<String> {
    const res = await this.http
      .get<User>(`/api/users/${userId}`, { headers: this.headers })
      .toPromise();
    return await res.name;
  }

  async addTenant(payload: TenantWrapper): Promise<Tenant> {
    return await this.http
      .post<Tenant>(`/api/tenants`, payload, { headers: this.headers })
      .toPromise();
  }

  async convertTenant(payload: number): Promise<Tenant> {
    return await this.http
      .get<Tenant>(`/api/tenants/convert/${payload},`, {
        headers: this.headers,
      })
      .toPromise();
  }
}
