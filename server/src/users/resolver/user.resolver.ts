import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserInput, UserOutput } from '../dto/user.dto';
import { User } from '../entities/User.entity';
import { UserService } from '../service/user.service';
import { LoginInput, LoginOutput } from '../dto/login.dto';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserOutput)
  async signUp(@Args('input') userInput: UserInput): Promise<UserOutput> {
    const signUpService = await this.userService.signup(userInput);
    return signUpService;
  }

  @Mutation(() => LoginOutput)
  async loginUser(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    const loginUserService = await this.userService.login(loginInput);
    return loginUserService;
  }
}
