import { Contact } from './contact.model';
import { Lease } from './lease.model';

export interface LeaseWrapper {
  lease: Lease;
  contacts: Contact[];
}
