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
        const endDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} 11:59:59`;

        //TODO is not working the data filter
        const [rows, fields] = await connection.execute("SELECT SUM(amount) as dayBalance FROM transactions WHERE user_id = ?", [user_id]);
        //const [rows, fields] = await connection.execute("SELECT SUM(amount) as dayBalance FROM transactions WHERE user_id = ? and DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') between STR_TO_DATE(?, '%Y-%m-%d %H:%i:%s') AND STR_TO_DATE(?, '%Y-%m-%d %H:%i:%s')", [user_id, startDate, endDate]);
        
        console.log('ROWS:', rows);
        return (rows as RowDataPacket[])[0]?.dayBalance as number || 0

    } catch (err) {
        console.error('Error to query balance:', err);
        throw err;
    } finally {
        await db.closeConnection();
    }
};
