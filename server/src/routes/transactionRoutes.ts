import { Router } from 'express';
import { getAllTransaction, createTransaction } from '../controllers/transaction.controller';

const router = Router();

router.get('/', getAllTransaction);
router.post('/', createTransaction);

export default router;