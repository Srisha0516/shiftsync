"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const errorHandler_1 = require("../middleware/errorHandler");
const auth_1 = require("../middleware/auth");
const availability_controller_1 = require("../controllers/availability.controller");
const router = (0, express_1.Router)();
router.use(auth_1.verifyToken);
router.post('/', [
    (0, express_validator_1.body)('day_of_week').isInt({ min: 0, max: 6 }),
    (0, express_validator_1.body)('start_time').notEmpty(),
    (0, express_validator_1.body)('end_time').notEmpty()
], errorHandler_1.validateRequest, availability_controller_1.setAvailability);
router.get('/team', auth_1.requireManager, availability_controller_1.getTeamAvailability);
exports.default = router;
