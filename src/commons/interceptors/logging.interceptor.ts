import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest()
        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap((e) => console.log(`${req.method} ${req.url} [${Date.now() - now}ms]`)),
            );
    }
}