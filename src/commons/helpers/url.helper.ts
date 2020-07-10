import { Request } from 'express';


export function getHttpUrl(req: Request): string {
    return `${req.protocol}://${req.headers.host}/`
}

export function transformJsonField(json: JSON, field: string, value: string): unknown {

    return { ...json, [field]: value }
}