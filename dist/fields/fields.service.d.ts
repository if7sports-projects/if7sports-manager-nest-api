import { Model } from 'mongoose';
import { FieldDocument } from './schemas/field.schema';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
export declare class FieldsService {
    private fieldModel;
    constructor(fieldModel: Model<FieldDocument>);
    create(dto: CreateFieldDto): Promise<FieldDocument>;
    findAll(): Promise<FieldDocument[]>;
    findByEntity(entityId: string): Promise<FieldDocument[]>;
    update(id: string, dto: UpdateFieldDto): Promise<FieldDocument>;
}
