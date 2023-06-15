export type TTransaction =
{
    type: TTransactionType,
    amount: number,
    description?: string,
    user_id: string
}
export type TTransactionType = 'CREDIT' | 'DEBIT';