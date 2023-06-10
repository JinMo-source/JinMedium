import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'askncsajkncjsa',
    });
  }

  async validate(payload: any): Promise<any> {
    // 토큰에서 추출된 정보로 사용자를 인증하고 반환합니다.
    return await this.authService.validateUserByEmail(payload.userEmail);
  }
}

//jwt.strategy.ts 파일은 JWT 토큰을 검증하고, 토큰에서 추출한 정보를 기반으로 사용자를 식별하여 인증하는 역할을 수행합니다.
