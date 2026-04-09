"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireManager = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Access denied. No token provided.' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.config.jwt.accessSecret);
        req.user = {
            userId: decoded.userId,
            role: decoded.role,
            businessId: decoded.businessId
        };
        next();
    }
    catch (error) {
        res.status(403).json({ error: 'Invalid or expired token.' });
    }
};
exports.verifyToken = verifyToken;
const requireManager = (req, res, next) => {
    if (req.user?.role !== 'manager') {
        res.status(403).json({ error: 'Manager access required.' });
        return;
    }
    next();
};
exports.requireManager = requireManager;
