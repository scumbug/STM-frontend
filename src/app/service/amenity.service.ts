import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Amenity } from '../model/amenity.model';
import { AuthService } from './auth.service';

@Injectable()
export class AmenityService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  headers = new HttpHeaders().set('Authorization', `${this.auth.sendToken()}`);

  async getAmenities(): Promise<Amenity[]> {
    return await this.http
      .get<Amenity[]>('/api/amenities', { headers: this.headers })
      .toPromise();
  }

  async getAmenity(amenityId: number): Promise<Amenity> {
    return await this.http
      .get<Amenity>(`/api/amenities/${amenityId}`, {
        headers: this.headers,
      })
      .toPromise();
  }

  async addAmenity(payload: Amenity): Promise<Amenity> {
    return await this.http
      .post<Amenity>(`/api/amenities`, payload, {
        headers: this.headers,
      })
      .toPromise();
  }
}
