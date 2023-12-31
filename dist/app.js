"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./app/User/user.route");
// Application
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// All client requests for <User> management.
app.use('/api/users', user_route_1.UsersRouter);
// Server root response
app.get('/', (req, res) => {
    res.send('The awesome server is running...');
});
exports.default = app;
