import express, { Request, Response } from 'express'
import * as config from '../sys/config';

const routerHealthCheck = express.Router()

routerHealthCheck.get('/health-check', status)

function status(req: Request, res: Response) {

    try {
        res.json({
            ok: true,
            path: req.path,
            date: new Date().toLocaleString(),
            version: config.VERSION
        })
    } catch (err) {
        res.json({ msg: 'Status error', error: err });
    }
}

export default routerHealthCheck;