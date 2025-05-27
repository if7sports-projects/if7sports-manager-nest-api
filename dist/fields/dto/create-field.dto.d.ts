export declare class AvailabilityDto {
    day: string;
    startHour: string;
    endHour: string;
    specialPrice: number;
    blocked: boolean;
}
export declare class ExtraOptionDto {
    available: boolean;
    price: number;
}
export declare class CreateFieldDto {
    entityId: string;
    name: string;
    sportType: string;
    location: string;
    capacity: number;
    availability?: AvailabilityDto[];
    pricePerHour: number;
    lighting: ExtraOptionDto;
    lockerRoom: ExtraOptionDto;
    equipmentRental: ExtraOptionDto;
}
