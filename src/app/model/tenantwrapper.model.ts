import { Contact } from './contact.model';
import { Tenant } from './tenant.model';
import { User } from './user.model';

export interface TenantWrapper {
  user: User;
  contact?: Contact[];
  tenant: Tenant;
  assignedAgent?: User;
}
