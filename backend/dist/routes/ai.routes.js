"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const errorHandler_1 = require("../middleware/errorHandler");
const auth_1 = require("../middleware/auth");
const ai_controller_1 = require("../controllers/ai.controller");
const router = (0, express_1.Router)();
router.post('/generate-schedule', auth_1.verifyToken, auth_1.requireManager, [
    (0, express_validator_1.body)('start_date').isDate(),
    (0, express_validator_1.body)('end_date').isDate()
], errorHandler_1.validateRequest, ai_controller_1.generateSchedule);
exports.default = router;
