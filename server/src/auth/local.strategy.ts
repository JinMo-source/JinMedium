import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/User.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(users: User): Promise<any> {
    const user = await this.authService.validateUser(users);
    console.log(user);

    if (!user) {
      console.log(user);
      throw new UnauthorizedException();
    }
    return user;
  }
}
