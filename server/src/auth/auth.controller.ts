import { Controller, Headers, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('/renew-token')
  async renewToken(@Headers('authorization') accessToken: string) {
    console.log('나는 Token이야', accessToken);

    const new_accessToken = '새로운_액세스_토큰'; // 새로 발급된 액세스 토큰

    return { new_accessToken };
  }
}
