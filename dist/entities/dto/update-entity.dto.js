"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEntityDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_entity_dto_1 = require("./create-entity.dto");
class UpdateEntityDto extends (0, mapped_types_1.PartialType)(create_entity_dto_1.CreateEntityDto) {
}
exports.UpdateEntityDto = UpdateEntityDto;
//# sourceMappingURL=update-entity.dto.js.map