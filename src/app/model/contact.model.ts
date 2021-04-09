export interface Contact {
  contactId?: number;
  contactType: ContactType;
  userId: number;
  contactNumber: string;
  contactEmail: string;
}

export enum ContactType {
  PRIMARY = 'PRIMARY',
  BILLING = 'BILLING',
}
