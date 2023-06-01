import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import { IUserSession } from '../models/user.session';
export function validateAuthHeader(req:Request):IUserSession|null{
     let authHeader=req.headers.authorization ?? null;
     
    if(authHeader==null || authHeader==""){
        return null;
    }

    if (authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7); // Extract token without 'Bearer ' prefix
    
    
     let tokenResult:IUserSession=verifyToken(token);

    if(tokenResult!=null){
        return tokenResult;
    }

    }
    return null;
}

function verifyToken(token: string): any {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp < currentTimestamp) {
        console.error('JWT token has expired');
        return null;
      }
      return decoded;
    } catch (error) {
      // Handle verification errors (e.g., invalid token, expired token)
      console.error('JWT verification error:', error);
      return null;
    }
  }