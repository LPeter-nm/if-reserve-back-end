export class User {
    id: number;

    role: Role;
}

export enum Action {
    Admin = 'manage',
    User = 'read',
}

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}