import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserInput, UserOutput } from '../dto/user.dto';
import { User } from '../entities/User.entity';
import { UserService } from '../service/user.service';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserOutput)
  async signUp(@Args('input') userInput: UserInput): Promise<UserOutput> {
    const signUpService = await this.userService.signup(userInput);
    return signUpService;
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async GetUser(@CurrentUser() user: User): Promise<User | null> {
    const userId = user.id;
    const currentUser = await this.userService.findById(userId);
    return user;
  }
}
