import { EntitiesService } from './entities.service';
import { Entity as EntityModel } from './schemas/entity.schema';
export declare class EntitiesController {
    private readonly entitiesService;
    constructor(entitiesService: EntitiesService);
    create(createEntityDto: Partial<EntityModel>): Promise<EntityModel>;
    findAll(): Promise<EntityModel[]>;
}
