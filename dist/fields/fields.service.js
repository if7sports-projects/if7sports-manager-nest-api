"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const field_schema_1 = require("./schemas/field.schema");
let FieldsService = class FieldsService {
    fieldModel;
    constructor(fieldModel) {
        this.fieldModel = fieldModel;
    }
    async create(dto) {
        const { entityId, ...rest } = dto;
        const payload = {
            ...rest,
            entityId: new mongoose_2.Types.ObjectId(entityId),
        };
        const created = new this.fieldModel(payload);
        return created.save();
    }
    async findAll() {
        return this.fieldModel.find().exec();
    }
    async findByEntity(entityId) {
        return this.fieldModel
            .find({ entityId: new mongoose_2.Types.ObjectId(entityId) })
            .exec();
    }
    async update(id, dto) {
        const { entityId, ...rest } = dto;
        const payload = {
            ...rest,
            ...(entityId ? { entityId: new mongoose_2.Types.ObjectId(entityId) } : {}),
        };
        const updated = await this.fieldModel
            .findByIdAndUpdate(id, payload, { new: true })
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException(`Field with id ${id} not found`);
        }
        return updated;
    }
};
exports.FieldsService = FieldsService;
exports.FieldsService = FieldsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(field_schema_1.Field.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FieldsService);
//# sourceMappingURL=fields.service.js.map