import { Request, Response } from 'express';
import Transaction from '../models/transaction.model';

const createTransaction = async (req: Request, res: Response) => {
  try {
    const { type, amount, category } = req.body;

    // Validation
    if (!type || !['income', 'expense'].includes(type)) {
      return res.status(400).json({
        error: 'Type is required and must be either "income" or "expense"',
      });
    }
    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ error: 'Amount is required and must be greater than 0' });
    }
    if (!category || category.trim() === '') {
      return res.status(400).json({ error: 'Category is required' });
    }

    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllTransaction = async (req: Request, res: Response) => {
  try {
    const { offset = '0', limit = '10' } = req.query;

    const skip = parseInt(offset as string, 10);
    const limitNum = parseInt(offset as string, 10);

    const [] = await Promise.all([
      Transaction.find().sort({ date: -1 }).skip(skip).limit(limitNum),
      Transaction.countDocuments(),
    ]);

    // const transactions = await Transaction.find().sort({ date: -1 });
    // res.status(200).json(transactions);
  } catch (error: any) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getAllTransaction, createTransaction };
