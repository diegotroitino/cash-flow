import { database } from "../sys/database";

type TTransaction = {
    type: string,
    amount: number,
    description: string,
    user_id: string,
    date: Date
}
export class transaction {
    async save(transaction: TTransaction): Promise<boolean> {
        const db = database.getInstance();
        try {

            await db.connect();

            const connection = db.getConnection();

            await connection.execute(`CREATE TABLE IF NOT EXISTS transactions (
                    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    type VARCHAR(7) NOT NULL,
                    amount DOUBLE NOT NULL,
                    description VARCHAR(255),
                    user_id VARCHAR(20) NOT NULL,
                    date DATETIME NOT NULL
                    )`);


            await connection.execute(
                `INSERT INTO transactions (type, amount, description, user_id, date) VALUES (?, ?, ?, ?,?)`,
                [transaction.type, transaction.amount, transaction.description, transaction.user_id, transaction.date]);

           
            return true;

        } catch (error) {
            console.error("Error saving transaction", error);
            return false;
        } finally {
            await db.closeConnection();
        }
    }
}