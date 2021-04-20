import { Lease } from './lease.model';

export interface Unit {
  unitId?: number;
  propertyId: number;
  unitNumber: string;
  floorArea: number;
  lease?: Lease;
}
