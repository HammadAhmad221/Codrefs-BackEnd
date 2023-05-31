import { Request, Response, NextFunction } from 'express';
import { validateAuthHeader } from '../../authentication';

// @ts-ignore
export function appMiddleware(req: Request, res: Response, next: NextFunction) {
  
  
  let isValid=validateAuthHeader(req);
  
  if(isValid==false){
    res.status(403).send('Access denied');
  }
   next();
}
