export interface User {
  userId?: number;
  name: string;
  username: string;
  password: string;
  type: UserType;
}

export enum UserType {
  ADMIN,
  SALES,
  FINANCE,
  TENANT,
  SUPER,
}
