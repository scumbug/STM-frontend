export interface Lease {
  leaseId?: number;
  tenantId: number;
  unitId: number;
  startDate: Date;
  endDate: Date;
  rent: number;
  tenantName?: string;
  archive: number;
}
