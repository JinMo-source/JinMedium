import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/User.entity';
import { AuthService } from './auth.service';
import { ValidateUser, ValidateUserOutput } from './dto/validateUser.dto';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => ValidateUserOutput)
  async validateUser(
    @Args('input') validateUser: ValidateUser,
  ): Promise<ValidateUserOutput> {
    const user = await this.authService.validateUser(validateUser);
    if (user) {
      const { accessToken } = await this.authService.login(validateUser);
      return {
        accessToken,
      };
    }
    // 사용자 인증 실패에 대한 처리를 추가할 수 있습니다.
    throw new Error('사용자 인증에 실패했습니다.');
  }
}
