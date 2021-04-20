export interface Payment {
  paymentId: number;
  leaseId: number;
  amount: number;
  paymentStatus: number;
  paymentDate: Date;
  paymentStartPeriod: Date;
  paymentEndPeriod: Date;
  paymentProof: Blob;
  tenantId: number;
}
