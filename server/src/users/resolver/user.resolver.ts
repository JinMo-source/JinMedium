import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserInput, UserOutput } from '../dto/user.dto';
import { User } from '../entities/User.entity';
import { UserService } from '../service/user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserOutput)
  async signUp(@Args('input') userInput: UserInput): Promise<UserOutput> {
    const signUpService = await this.userService.signup(userInput);
    return signUpService;
  }

  @Query(() => User)
  async GetUser(@Args('ID') id: number): Promise<User | null> {
    const user = await this.userService.findById(id);
    return user;
  }
}
