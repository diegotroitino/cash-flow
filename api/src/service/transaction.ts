import { produce } from "./messageBroker";
import { TTransaction } from "../types/TTransaction";

export type TTransactionResult =
    {
        success: boolean,
        error?: string
    }

 export const createTransaction = async (transaction: TTransaction): Promise<TTransactionResult>  => {
    
    //TODO validate transaction here

    // send transaction to a message broker
    let success = await produce(transaction, 'transactions');

    return success as TTransactionResult;
};