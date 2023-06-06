import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/User.entity';
import { UserService } from 'src/users/service/user.service';
import { validateUser } from './dto/validateUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: validateUser): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async validateUserByEmail(userEmail: string): Promise<User | null> {
    const user = await this.userService.findByEmail(userEmail);
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = { userEmail: user.email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
