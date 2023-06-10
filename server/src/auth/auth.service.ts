import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/User.entity';
import { UserService } from '../users/service/user.service';
import { ValidateUser } from './dto/validateUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(validateUser: ValidateUser): Promise<User | null> {
    try {
      const user = await this.userService.findByEmail(validateUser.email);
      if (
        user &&
        (await bcrypt.compare(validateUser.password, user.password))
      ) {
        return user;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async validateUserByEmail(userEmail: string): Promise<User | null> {
    const user = await this.userService.findByEmail(userEmail);
    if (user) {
      return user;
    }
    return null;
  }

  async login(validateUser: ValidateUser): Promise<{ accessToken: string }> {
    const user = await this.validateUser(validateUser);
    if (user) {
      const payload = { username: user.username, email: user.email };
      const accessToken = this.jwtService.sign(payload);
      console.log(accessToken);
      return { accessToken };
    }
    // 사용자 인증 실패 시에는 예외 처리 등을 수행할 수 있습니다.
    throw new Error('사용자 인증에 실패했습니다.');
  }
}
