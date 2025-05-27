"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFieldDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_field_dto_1 = require("./create-field.dto");
class UpdateFieldDto extends (0, mapped_types_1.PartialType)(create_field_dto_1.CreateFieldDto) {
}
exports.UpdateFieldDto = UpdateFieldDto;
//# sourceMappingURL=update-field.dto.js.map