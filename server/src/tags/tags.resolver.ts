import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TagsService } from './tags.service';
import { TagsEntity } from './entities/tags.entity';
import { TagsInput, TagsOutput } from './dto/tags.dto';

@Resolver(() => TagsEntity)
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @Mutation(() => TagsOutput)
  async GetTags(@Args('input') tagsInput: TagsInput): Promise<TagsOutput> {
    try {
      await this.tagsService.GetTags(tagsInput);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: `${error}`,
      };
    }
  }
}
