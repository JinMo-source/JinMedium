import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/User.entity';
import { AuthService } from './auth.service';
import { validateUser } from './dto/validateUser.dto';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async validateUser(
    @Args('input') ValidateUser: validateUser,
  ): Promise<User> | null {
    const validate = await this.authService.validateUser(ValidateUser);
    return validate;
  }
}
