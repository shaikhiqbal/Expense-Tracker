import { Router } from 'express';

// ** Controllers
import { getAllTransaction } from '@/controllers/transaction.controller';

const route = Router();

route.get('/transaction-record', getAllTransaction);
