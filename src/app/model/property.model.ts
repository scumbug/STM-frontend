import { Unit } from './unit.model';

export interface Property {
  propertyId?: number;
  name: string;
  propertyType: PropertyType;
  address: string;
  propertStatus: PropertyStatus;
  managementStatus: ManagementStatus;
  maintenanceFee: number;
  builtDate: Date;
  units: Unit[];
  leasedUnits?: number;
}

export enum PropertyType {
  COMMERICAL = 'COMMERCIAL',
  RESIDENTIAL = 'RESIDENTIAL',
  MIXED = 'MIXED',
}

export enum PropertyStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export enum ManagementStatus {
  OWNER = 'OWNER',
  THIRD_PARTY = 'THIRD_PARTY',
}
