import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateUser } from './dto/validateUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() validateUser: ValidateUser,
  ): Promise<{ accessToken: string }> {
    const { accessToken } = await this.authService.login(validateUser);
    return { accessToken };
  }
}
