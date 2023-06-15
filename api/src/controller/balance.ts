import express, { Request, Response } from 'express'
import { getBalance } from '../service/queries/balance';



const routerBalance = express.Router()

//routerTrasacions.use(authenticateJWT);

routerBalance.get('/dayBalance', async (req: Request, res: Response) => {


    try {

        //TODO use date-fns to manipulate dates better
        const date = (req.query.date as string) + 'T00:00:00';
        console.log("DATE QUERY", date);
        const balance = await getBalance('001', new Date(date));

        res.json({ success: true, balance });        
    } catch (error) {
        res.status(500).json({ success: false, error: error });        
    }   
});

export default routerBalance;
