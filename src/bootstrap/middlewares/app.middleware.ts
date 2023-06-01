import { Request } from 'express';
import { validateAuthHeader } from '../../authentication';

export const expressAuthentication = async (
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> => {
   return new Promise((resolve,reject)=>{
    if (securityName === 'bearerAuth') {
      // Retrieve the token from the request headers
      const decoded = validateAuthHeader(request);
      if (decoded != null) {
        resolve(decoded);
      }
      reject(new Error("Access denied"));
    }
   })};



/*
// @ts-ignore
export function appMiddleware(req: Request, res: Response, next: NextFunction) {
  
  
  let isValid=validateAuthHeader(req);
  
  if(isValid==false){
    res.status(403).send('Access denied');
  }
   next();
}
*/