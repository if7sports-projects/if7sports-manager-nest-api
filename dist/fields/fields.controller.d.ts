import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { Field as FieldModel } from './schemas/field.schema';
export declare class FieldsController {
    private readonly fieldsService;
    constructor(fieldsService: FieldsService);
    create(dto: CreateFieldDto): Promise<FieldModel>;
    findAll(): Promise<FieldModel[]>;
    findByEntity(entityId: string): Promise<FieldModel[]>;
    update(id: string, dto: UpdateFieldDto): Promise<FieldModel>;
}
