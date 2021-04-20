import { Amenity } from './amenity.model';

export interface Schedule {
  scheduleId?: number;
  unitId: number;
  amenityId: number;
  scheduleDate: Date;
  amenityName?: String;
  propertyName?: String;
  unitNumber?: String;
}
