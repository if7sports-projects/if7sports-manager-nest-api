"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: process.env.JWT_SECRET || 'cambiar_por_algo_seguro',
    expiresIn: '1h',
};
//# sourceMappingURL=constants.js.map