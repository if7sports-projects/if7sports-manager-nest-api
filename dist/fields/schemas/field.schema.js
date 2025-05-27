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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldSchema = exports.Field = exports.ExtraOptionSchema = exports.ExtraOption = exports.AvailabilitySchema = exports.Availability = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Availability = class Availability {
    day;
    startHour;
    endHour;
    specialPrice;
    blocked;
};
exports.Availability = Availability;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Availability.prototype, "day", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Availability.prototype, "startHour", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Availability.prototype, "endHour", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Availability.prototype, "specialPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Availability.prototype, "blocked", void 0);
exports.Availability = Availability = __decorate([
    (0, mongoose_1.Schema)()
], Availability);
exports.AvailabilitySchema = mongoose_1.SchemaFactory.createForClass(Availability);
let ExtraOption = class ExtraOption {
    available;
    price;
};
exports.ExtraOption = ExtraOption;
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ExtraOption.prototype, "available", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ExtraOption.prototype, "price", void 0);
exports.ExtraOption = ExtraOption = __decorate([
    (0, mongoose_1.Schema)()
], ExtraOption);
exports.ExtraOptionSchema = mongoose_1.SchemaFactory.createForClass(ExtraOption);
let Field = class Field {
    entityId;
    name;
    sportType;
    location;
    capacity;
    availability;
    pricePerHour;
    lighting;
    lockerRoom;
    equipmentRental;
};
exports.Field = Field;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Entity', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Field.prototype, "entityId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, maxlength: 100 }),
    __metadata("design:type", String)
], Field.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, maxlength: 50 }),
    __metadata("design:type", String)
], Field.prototype, "sportType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, maxlength: 200 }),
    __metadata("design:type", String)
], Field.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 1 }),
    __metadata("design:type", Number)
], Field.prototype, "capacity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.AvailabilitySchema], default: [] }),
    __metadata("design:type", Array)
], Field.prototype, "availability", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], Field.prototype, "pricePerHour", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.ExtraOptionSchema, default: {} }),
    __metadata("design:type", ExtraOption)
], Field.prototype, "lighting", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.ExtraOptionSchema, default: {} }),
    __metadata("design:type", ExtraOption)
], Field.prototype, "lockerRoom", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.ExtraOptionSchema, default: {} }),
    __metadata("design:type", ExtraOption)
], Field.prototype, "equipmentRental", void 0);
exports.Field = Field = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Field);
exports.FieldSchema = mongoose_1.SchemaFactory.createForClass(Field);
exports.FieldSchema.index({ entityId: 1 });
//# sourceMappingURL=field.schema.js.map