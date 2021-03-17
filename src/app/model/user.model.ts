export interface User {
    userId?: number;
    name: string;
    username: string;
    password: string;
    type: UserType;
}

enum UserType {
    ADMIN,
    SALES,
    FINANCE,
    TENANT,
    SUPER
}