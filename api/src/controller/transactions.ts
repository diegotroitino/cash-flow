import express, { Request, Response } from 'express'
import { createTransaction } from '../service/transaction';
import authenticateJWT from '../sys/authenticateJWT';
import { TTransactionType } from '../types/TTransaction';
import { TypedRequestBody } from '../types/TypedRequestBody';


const routerTransactions = express.Router()

//routerTrasacions.use(authenticateJWT);

export type TTransactionRequestBody = {
    type: TTransactionType,
    amount: number,
    description: string
}

// Rota para criar uma transação
routerTransactions.post('/transactions', async (req: TypedRequestBody<TTransactionRequestBody>, res: Response) => {
    const { type, amount, description } = req.body;
    //const userId = req.user.id;

    try {

        const transaction = {
            type,
            amount,
            description,
            user_id: '001',
        };

        const result = await createTransaction(transaction);

        if (!result.success)
            res.status(500).json({ success: false, error: result.error });
        else
            res.json({ success: true });
            
    } catch (error) {
        res.status(500).json({ success: false, error })
    }

});

export default routerTransactions;
