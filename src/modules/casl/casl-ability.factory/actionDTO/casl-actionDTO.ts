export class User {
    id: number;

    role: Role;
}

export enum Action {
    General = 'control',
    Admin = 'manage',
    User = 'read',
}

export enum Role {
    GENERAL = 'GENERAL',
    USER = 'USER',
    ADMIN = 'ADMIN',
}