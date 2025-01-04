import JWT from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from './error-handler';
const tokens: string[] = ['auth', 'seller', 'gig', 'search', 'buyer', 'message', 'order', 'review'];  //incoming jwt will have id and it will be any of the token
export function verifyGatewayRequest(req: Request , _res:Response , next: NextFunction) : void {
    if(!req.headers?.gatewaytoken){
        throw new NotAuthorizedError("invalid request","verifyGatewayRequest -> gateway-middleware->src->9-ecom-shared");
    }
    const token : string = req.headers.gatewaytoken as string ;
    try{
        const payload:{id:string , iad:number} =JWT.verify(token , '1282722b942e08c8a6cb033aa6ce850e') as {id:string , iad:number};
        if (!tokens.includes(payload.id)) {
            throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request payload is invalid');
          }
    }
    catch (error) {
        throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway');
    }

}