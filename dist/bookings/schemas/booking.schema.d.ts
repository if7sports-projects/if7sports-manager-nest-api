import { Document, Types } from 'mongoose';
export declare class Booking {
    userId: Types.ObjectId;
    fieldId: Types.ObjectId;
    entityId: Types.ObjectId;
    startTime: Date;
    endTime: Date;
    totalPrice: number;
    status: string;
}
export type BookingDocument = Booking & Document;
export declare const BookingSchema: import("mongoose").Schema<Booking, import("mongoose").Model<Booking, any, any, any, Document<unknown, any, Booking, any> & Booking & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Booking, Document<unknown, {}, import("mongoose").FlatRecord<Booking>, {}> & import("mongoose").FlatRecord<Booking> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
