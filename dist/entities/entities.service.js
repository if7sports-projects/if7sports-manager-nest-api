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
exports.EntitiesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const entity_schema_1 = require("./schemas/entity.schema");
let EntitiesService = class EntitiesService {
    entityModel;
    constructor(entityModel) {
        this.entityModel = entityModel;
    }
    async create(dto) {
        const { organizerId, staff, ...rest } = dto;
        const payload = {
            ...rest,
            organizerId: new mongoose_2.Types.ObjectId(organizerId),
            ...(staff
                ? { staff: staff.map(id => new mongoose_2.Types.ObjectId(id)) }
                : {}),
        };
        const created = new this.entityModel(payload);
        return created.save();
    }
    async findAll() {
        return this.entityModel.find().exec();
    }
    async update(id, dto) {
        const { organizerId, staff, ...rest } = dto;
        const payload = {
            ...rest,
            ...(organizerId
                ? { organizerId: new mongoose_2.Types.ObjectId(organizerId) }
                : {}),
            ...(staff
                ? { staff: staff.map(id => new mongoose_2.Types.ObjectId(id)) }
                : {}),
        };
        const updated = await this.entityModel
            .findByIdAndUpdate(id, payload, { new: true })
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException(`Entity con id ${id} no encontrada`);
        }
        return updated;
    }
};
exports.EntitiesService = EntitiesService;
exports.EntitiesService = EntitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(entity_schema_1.Entity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EntitiesService);
//# sourceMappingURL=entities.service.js.map