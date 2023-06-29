import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/User.entity';
import { AuthService } from './auth.service';
import {
  RefreshTokenInput,
  RefreshTokenOutput,
  ValidateUser,
  LoginOutput,
} from './dto/validateUser.dto';
import { CurrentUser } from './current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginOutput)
  async validateUser(
    @Args('input') validateUser: ValidateUser,
  ): Promise<LoginOutput> {
    const user = await this.authService.validateUser(validateUser);
    if (user) {
      const { userEmail, isLoggedIn, accessToken } =
        await this.authService.login(validateUser);

      return {
        userEmail,
        isLoggedIn,
        accessToken,
      };
    }
    // 사용자 인증 실패에 대한 처리를 추가할 수 있습니다.
    throw new Error('사용자 인증에 실패했습니다.');
  }
}
