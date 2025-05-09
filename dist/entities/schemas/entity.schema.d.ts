import { Document, Types } from 'mongoose';
export type EntityDocument = Entity & Document;
export declare class Entity {
    name: string;
    cif: string;
    address: string;
    phone: string;
    organizerId: Types.ObjectId;
    staff: Types.ObjectId[];
    status: string;
}
export declare const EntitySchema: import("mongoose").Schema<Entity, import("mongoose").Model<Entity, any, any, any, Document<unknown, any, Entity, any> & Entity & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Entity, Document<unknown, {}, import("mongoose").FlatRecord<Entity>, {}> & import("mongoose").FlatRecord<Entity> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
