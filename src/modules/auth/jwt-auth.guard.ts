import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context)
        const request = context.switchToHttp().getRequest();
        // TODO: make it better
        if (request.params.userId)
            return request.user.userId === request.params.userId
        // TODO: improve it during development
        return true
    }
}
