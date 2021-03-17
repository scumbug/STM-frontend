export interface Contact {
  contactId?: number;
  contactType: ContactType;
  userId: number;
  contactNumber: string;
  contactEmail: string;
}

enum ContactType {
  PRIMARY,
  BILLING,
}
