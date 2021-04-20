import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../model/payment.model';
import { AuthService } from './auth.service';

@Injectable()
export class PaymentService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  headers = new HttpHeaders().set('Authorization', `${this.auth.sendToken()}`);

  async getPaymentsForTenant(
    tenantId: number,
    unitId: number
  ): Promise<Payment[]> {
    const params = new HttpParams()
      .set('tenantId', tenantId.toString())
      .set('unitId', unitId.toString());

    return await this.http
      .get<Payment[]>('/api/payments', {
        headers: this.headers,
        params,
      })
      .toPromise();
  }

  async addPayment(payload: FormData): Promise<void> {
    return await this.http
      .put<any>('/api/payments', payload, {
        headers: this.headers,
      })
      .toPromise();
  }
}
