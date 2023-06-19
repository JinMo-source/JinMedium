import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TagsService } from './tags.service';
import { TagsEntity } from './entities/tags.entity';
import { TagsInput } from './dto/tags.dto';

@Resolver()
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @Mutation(() => TagsEntity)
  async GetTags(@Args('input') TagsInput: TagsInput) {
    // this.tagsService.GetTags()
  }
}
