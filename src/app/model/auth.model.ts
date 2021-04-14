export interface Auth {
  token: string;
  type: string;
  id: number;
  username: string;
  roles: Role[];
}

export enum Role {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_SUPER = 'ROLE_SUPER',
  ROLE_TENANT = 'ROLE_TENANT',
  ROLE_SALES = 'ROLE_SALES',
}
