import { RowDataPacket } from "mysql2";
import { database } from "../../sys/database";

export const getBalance = async (user_id: string, date: Date): Promise<number> => {

    //TODO improve this search quering from a consolidated database like a datalake
    const db = database.getInstance();
    try {

       await db.connect();

        const connection = db.getConnection();
        
        //TODO use date-fns to manipulate dates better

        const startDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} 00:00:00`;
        const endDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} 23:59:59`;

        const [rows, fields] = await connection.execute("select SUM(amount) as dayBalance from cashflowdb.transactions where user_id = ? and  date between ? and ?;", [user_id, startDate, endDate]);
        
        console.log('ROWS:', rows);
        return (rows as RowDataPacket[])[0]?.dayBalance as number || 0

    } catch (err) {
        console.error('Error to query balance:', err);
        throw err;
    } finally {
        await db.closeConnection();
    }
};
