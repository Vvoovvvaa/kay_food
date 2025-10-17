import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request,Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: (error?: any) => void) {
        console.log(req.body,"body")
        console.log(req.headers,"headers")
        console.log(req.method,"methods")
        res.status(400).json({
            error:'error',
        });
        next()
    }
}