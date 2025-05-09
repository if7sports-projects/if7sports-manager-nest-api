import { Model } from 'mongoose';
import { Entity, EntityDocument } from './schemas/entity.schema';
export declare class EntitiesService {
    private entityModel;
    constructor(entityModel: Model<EntityDocument>);
    create(createDto: Partial<Entity>): Promise<Entity>;
    findAll(): Promise<Entity[]>;
}
