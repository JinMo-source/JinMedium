import {
  Body,
  Controller,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/refresh_token')
  async renewToken(@Body() userEmail: string) {
    try {
      const newAccessToken = await this.authService.RefreshAccessToken(
        userEmail,
      );

      return newAccessToken;
    } catch (error) {
      // 액세스 토큰 갱신 중에 오류가 발생한 경우 처리합니다.
      console.error('Failed to renew access token:', error);
      // 적절한 오류 응답을 반환합니다.
      throw new UnauthorizedException('Failed to renew access token');
    }
  }
}
