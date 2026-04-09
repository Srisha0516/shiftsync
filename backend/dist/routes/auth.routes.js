"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const errorHandler_1 = require("../middleware/errorHandler");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/register', [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 6 }),
    (0, express_validator_1.body)('full_name').notEmpty(),
    (0, express_validator_1.body)('business_name').notEmpty()
], errorHandler_1.validateRequest, auth_controller_1.registerManager);
router.post('/login', [(0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').notEmpty()], errorHandler_1.validateRequest, auth_controller_1.login);
router.post('/invite', auth_1.verifyToken, auth_1.requireManager, [(0, express_validator_1.body)('email').isEmail()], errorHandler_1.validateRequest, auth_controller_1.inviteEmployee);
router.post('/signup', [
    (0, express_validator_1.body)('token').notEmpty(),
    (0, express_validator_1.body)('password').isLength({ min: 6 }),
    (0, express_validator_1.body)('full_name').notEmpty()
], errorHandler_1.validateRequest, auth_controller_1.employeeSignup);
router.post('/refresh', [(0, express_validator_1.body)('token').notEmpty()], errorHandler_1.validateRequest, auth_controller_1.refreshTokenEndpoint);
exports.default = router;
