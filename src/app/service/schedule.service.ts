import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schedule } from '../model/schedule.model';
import { AmenityService } from './amenity.service';
import { AuthService } from './auth.service';
import { PropertyService } from './property.service';
import { UnitService } from './unit.service';

@Injectable()
export class ScheduleService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private amenityService: AmenityService,
    private unitService: UnitService,
    private propertyService: PropertyService
  ) {}

  headers = new HttpHeaders().set('Authorization', `${this.auth.sendToken()}`);

  async getSchedule(): Promise<Schedule[]> {
    try {
      // get all schedules
      const schedules = await this.http
        .get<Schedule[]>('/api/schedules', { headers: this.headers })
        .toPromise();

      // get names
      for (const schedule of schedules) {
        const amenity = await this.amenityService.getAmenity(
          schedule.amenityId
        );
        const unit = await this.unitService.getUnit(schedule.unitId);
        const property = await this.propertyService.getProperty(
          unit.propertyId
        );
        schedule.amenityName = amenity.name;
        schedule.propertyName = `${property.name} - ${unit.unitNumber}`;
      }
      return schedules;
    } catch (error) {
      console.log(error);
    }
  }

  async confirmSchedule(scheduleId: number): Promise<Schedule> {
    return await this.http
      .get<Schedule>(`/api/schedules/${scheduleId}/confirm`, {
        headers: this.headers,
      })
      .toPromise();
  }

  async addSchedule(schedule: Schedule) {
    return await this.http
      .post<Schedule>('/api/schedules', schedule, {
        headers: this.headers,
      })
      .toPromise();
  }
}
