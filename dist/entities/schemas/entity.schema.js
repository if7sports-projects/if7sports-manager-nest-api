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
exports.EntitySchema = exports.Entity = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Entity = class Entity {
    name;
    cif;
    address;
    phone;
    organizerId;
    staff;
    status;
};
exports.Entity = Entity;
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxlength: 100, trim: true }),
    __metadata("design:type", String)
], Entity.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
        uppercase: true,
        match: /^[A-Z0-9]{8,10}$/,
    }),
    __metadata("design:type", String)
], Entity.prototype, "cif", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxlength: 200, trim: true }),
    __metadata("design:type", String)
], Entity.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ maxlength: 20, match: /^\+?[0-9\s-]{7,20}$/ }),
    __metadata("design:type", String)
], Entity.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Entity.prototype, "organizerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'User', default: [] }),
    __metadata("design:type", Array)
], Entity.prototype, "staff", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['pending', 'active', 'rejected'], default: 'pending' }),
    __metadata("design:type", String)
], Entity.prototype, "status", void 0);
exports.Entity = Entity = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Entity);
exports.EntitySchema = mongoose_1.SchemaFactory.createForClass(Entity);
exports.EntitySchema.index({ cif: 1 }, { unique: true });
exports.EntitySchema.index({ organizerId: 1 });
//# sourceMappingURL=entity.schema.js.map