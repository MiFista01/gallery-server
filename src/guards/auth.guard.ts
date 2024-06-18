import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JwtService } from 'src/services/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwt: JwtService,
        private readonly reflector: Reflector,
    ) {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.get<boolean>(
            'isPublic',
            context.getHandler(),
        );
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const cookieValue = request.cookies['token'];
        try {
            return this.jwt.verifyToken(cookieValue);
        } catch (error) {
            return false;
        }
    }
}
