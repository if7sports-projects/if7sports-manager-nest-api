import { EntitiesService } from './entities.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { Entity as EntityModel } from './schemas/entity.schema';
export declare class EntitiesController {
    private readonly entitiesService;
    constructor(entitiesService: EntitiesService);
    create(createEntityDto: CreateEntityDto): Promise<EntityModel>;
    findAll(): Promise<EntityModel[]>;
    update(id: string, updateEntityDto: UpdateEntityDto): Promise<EntityModel>;
}
