export declare class CreateBookingDto {
    userId: string;
    fieldId: string;
    entityId: string;
    startTime: string;
    endTime: string;
    totalPrice: number;
    status?: 'pending' | 'confirmed' | 'cancelled';
}
