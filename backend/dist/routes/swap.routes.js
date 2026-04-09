"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const errorHandler_1 = require("../middleware/errorHandler");
const auth_1 = require("../middleware/auth");
const swap_controller_1 = require("../controllers/swap.controller");
const router = (0, express_1.Router)();
router.use(auth_1.verifyToken);
router.post('/', [
    (0, express_validator_1.body)('shift_id').notEmpty(),
    (0, express_validator_1.body)('target_id').notEmpty()
], errorHandler_1.validateRequest, swap_controller_1.requestSwap);
router.post('/:swap_id/approve', auth_1.requireManager, swap_controller_1.approveSwap);
exports.default = router;
