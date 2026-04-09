import { Router } from 'express';
import { verifyToken, requireManager } from '../middleware/auth';
import { getAttendanceReport, exportCsv } from '../controllers/report.controller';

const router = Router();

router.use(verifyToken);
router.use(requireManager);

router.get('/', getAttendanceReport);
router.get('/export', exportCsv);

export default router;
