"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./app/routes"));
const error_middleware_1 = require("./app/middlewares/error.middleware");
const app = (0, express_1.default)();
// Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Urban Farming API is Running Smoothly!",
    });
});
app.use(error_middleware_1.globalErrorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map