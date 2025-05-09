export declare class CreateEntityDto {
    name: string;
    cif: string;
    address: string;
    phone?: string;
    organizerId: string;
    staff?: string[];
    status?: 'pending' | 'active' | 'rejected';
}
