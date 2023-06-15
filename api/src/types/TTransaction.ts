export type TTransaction =
{
    type: TTransactionType,
    amount: number,
    description?: string,
    user_id: string, 
    date: Date
}
export enum TTransactionType 
 {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT'
 }