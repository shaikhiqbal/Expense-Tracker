import { Router } from 'express';

// ** Controllers
import {
  createTransaction,
  getAllTransaction,
  searchTransaction,
} from '../controllers/transaction.controller';

const route = Router();

route.post('/', createTransaction);
route.get('/transaction', getAllTransaction);
route.get('/search-transaction', searchTransaction);

export default route;
