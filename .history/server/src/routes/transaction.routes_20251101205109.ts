import { Router } from 'express';

// ** Controllers
import {
  createTransaction,
  getAllTransaction,
} from '../controllers/transaction.controller';

const route = Router();

route.post('/', createTransaction);
route.get('/transaction', getAllTransaction);

export default route;
