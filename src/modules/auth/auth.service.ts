import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.model';
import { UserPayload } from '../users/payloads/user.payload';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<UserPayload> {
        const user = await this.usersService.findByUsernameAndPassword(username, pass);
        if (user) {
            return user as User;
        }
        return null;
    }

    async login(user: UserPayload): Promise<{ access_token: string }> {
        const payload = { sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}