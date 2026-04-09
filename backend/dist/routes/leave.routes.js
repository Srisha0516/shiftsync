"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const errorHandler_1 = require("../middleware/errorHandler");
const auth_1 = require("../middleware/auth");
const leave_controller_1 = require("../controllers/leave.controller");
const router = (0, express_1.Router)();
router.use(auth_1.verifyToken);
router.post('/', [
    (0, express_validator_1.body)('start_date').isDate(),
    (0, express_validator_1.body)('end_date').isDate(),
    (0, express_validator_1.body)('reason').notEmpty()
], errorHandler_1.validateRequest, leave_controller_1.applyLeave);
router.post('/:leave_id/approve', auth_1.requireManager, leave_controller_1.approveLeave);
exports.default = router;
