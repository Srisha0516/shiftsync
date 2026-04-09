"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const errorHandler_1 = require("../middleware/errorHandler");
const auth_1 = require("../middleware/auth");
const shift_controller_1 = require("../controllers/shift.controller");
const router = (0, express_1.Router)();
router.use(auth_1.verifyToken);
router.get('/', shift_controller_1.getShifts);
router.post('/', auth_1.requireManager, [
    (0, express_validator_1.body)('title').notEmpty(),
    (0, express_validator_1.body)('shift_date').isDate(),
    (0, express_validator_1.body)('start_time').notEmpty(),
    (0, express_validator_1.body)('end_time').notEmpty(),
    (0, express_validator_1.body)('user_ids').isArray()
], errorHandler_1.validateRequest, shift_controller_1.createShift);
router.post('/publish', auth_1.requireManager, [
    (0, express_validator_1.body)('start_date').isDate(),
    (0, express_validator_1.body)('end_date').isDate()
], errorHandler_1.validateRequest, shift_controller_1.publishWeeklySchedule);
exports.default = router;
