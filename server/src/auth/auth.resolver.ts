import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/User.entity';
import { AuthService } from './auth.service';
import {
  RefreshTokenInput,
  RefreshTokenOutput,
  ValidateUser,
  ValidateUserOutput,
} from './dto/validateUser.dto';
import { CurrentUser } from './current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => ValidateUserOutput)
  async validateUser(
    @Args('input') validateUser: ValidateUser,
  ): Promise<ValidateUserOutput> {
    const user = await this.authService.validateUser(validateUser);
    if (user) {
      const { id, userEmail, username, accessToken, verified, role } =
        await this.authService.login(validateUser);

      return {
        id,
        userEmail,
        username,
        accessToken,
        verified,
        role,
      };
    }
    // 사용자 인증 실패에 대한 처리를 추가할 수 있습니다.
    throw new Error('사용자 인증에 실패했습니다.');
  }
  @Mutation(() => RefreshTokenOutput)
  @UseGuards(GqlAuthGuard)
  async RefreshAccessTokenResolver(
    @CurrentUser() user: User,
    @Args('input') refreshTokenInput: RefreshTokenInput,
  ): Promise<any> {
    console.log(user);
    // console.log(refreshTokenInput, user);
    const userId = user.id;
    const { newAccessToken, expiresInMs } =
      await this.authService.RefreshAccessToken(userId);
    return { newAccessToken, expiresInMs };
  }
}
