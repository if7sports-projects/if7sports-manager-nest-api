export declare class CreateUserDto {
    role: 'admin' | 'organizer' | 'staff' | 'client';
    entityId?: string;
    name: string;
    email: string;
    passwordHash: string;
    phone?: string;
    address?: string;
    status?: 'pending' | 'active' | 'rejected';
}
