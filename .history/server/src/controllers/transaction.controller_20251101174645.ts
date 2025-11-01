import { Request, Response } from 'express';
import Transaction from '../models/transaction.model.ts';

const createTransaction = async (req: Request, res: Response) => {
  try {
    console.log('POST /transactions - Request body:', req.body);
    const transaction = new Transaction(req.body);
    await transaction.save();
    console.log('Transaction created:', transaction);
    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(400).json({ error: 'Failed to create transaction' });
  }
};

const getAllTransaction = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

export { getAllTransaction, createTransaction };
