export interface Tenant {
  tenantId?: number;
  userId: number;
  assignedAgent: number;
  leasedUnit: number;
  company: string;
  tenantStatus: TenantStatus;
  notes: string;
}

export enum TenantStatus {
  POTENTIAL = 'POTENTIAL',
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
