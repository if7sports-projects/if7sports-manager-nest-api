import { Model } from 'mongoose';
import { EntityDocument } from './schemas/entity.schema';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
export declare class EntitiesService {
    private readonly entityModel;
    constructor(entityModel: Model<EntityDocument>);
    create(dto: CreateEntityDto): Promise<EntityDocument>;
    findAll(): Promise<EntityDocument[]>;
    update(id: string, dto: UpdateEntityDto): Promise<EntityDocument>;
}
