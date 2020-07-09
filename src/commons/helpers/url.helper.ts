import { Request } from 'express';


export function getHttpUrl(req: Request): string {
    return `${req.protocol}://${req.headers.host}/`
}