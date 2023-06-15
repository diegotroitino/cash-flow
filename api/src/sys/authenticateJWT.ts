import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from "./config";

// TODO not used yet, JWT authentication
export default (req: Request, res: Response, next: () => void) => {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, JWT_SECRET_KEY, (err: any, user: any) => {
        if (err) {
          return res.sendStatus(403);
        }
        //req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
  