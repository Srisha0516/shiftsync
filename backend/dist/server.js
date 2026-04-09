"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
require("./services/cron.service"); // Start cron jobs
const server = http_1.default.createServer(app_1.default);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: env_1.config.frontendUrl,
        methods: ['GET', 'POST']
    }
});
exports.io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    // Custom event mappings can be handled here or inside controllers using io.emit
    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});
server.listen(env_1.config.port, () => {
    console.log(`Server running in ${env_1.config.nodeEnv} mode on port ${env_1.config.port}`);
});
