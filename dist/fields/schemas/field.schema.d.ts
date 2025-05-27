import { Document, Types } from 'mongoose';
export declare class Availability {
    day: string;
    startHour: string;
    endHour: string;
    specialPrice: number;
    blocked: boolean;
}
export declare const AvailabilitySchema: import("mongoose").Schema<Availability, import("mongoose").Model<Availability, any, any, any, Document<unknown, any, Availability, any> & Availability & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Availability, Document<unknown, {}, import("mongoose").FlatRecord<Availability>, {}> & import("mongoose").FlatRecord<Availability> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class ExtraOption {
    available: boolean;
    price: number;
}
export declare const ExtraOptionSchema: import("mongoose").Schema<ExtraOption, import("mongoose").Model<ExtraOption, any, any, any, Document<unknown, any, ExtraOption, any> & ExtraOption & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ExtraOption, Document<unknown, {}, import("mongoose").FlatRecord<ExtraOption>, {}> & import("mongoose").FlatRecord<ExtraOption> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Field {
    entityId: Types.ObjectId;
    name: string;
    sportType: string;
    location: string;
    capacity: number;
    availability: Availability[];
    pricePerHour: number;
    lighting: ExtraOption;
    lockerRoom: ExtraOption;
    equipmentRental: ExtraOption;
}
export type FieldDocument = Field & Document;
export declare const FieldSchema: import("mongoose").Schema<Field, import("mongoose").Model<Field, any, any, any, Document<unknown, any, Field, any> & Field & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Field, Document<unknown, {}, import("mongoose").FlatRecord<Field>, {}> & import("mongoose").FlatRecord<Field> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
