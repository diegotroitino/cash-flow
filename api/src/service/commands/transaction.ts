import { produce } from "../../sys/messageBroker";
import { TTransaction, TTransactionType } from "../../types/TTransaction";

export type TTransactionResult =
    {
        success: boolean,
        error?: string
    }

export const createTransaction = async (transaction: TTransaction): Promise<TTransactionResult> => {

    if (!Object.values(TTransactionType).includes(transaction.type)) {
        return { success: false, error: 'Invalid transaction type' };
    }

    if ((transaction.type === TTransactionType.CREDIT && transaction.amount < 0) ||
        (transaction.type === TTransactionType.DEBIT && transaction.amount > 0))
        transaction.amount *= -1;


    // send transaction to a message broker
    const result = await produce(transaction, 'transactions');

    return result as TTransactionResult;
};