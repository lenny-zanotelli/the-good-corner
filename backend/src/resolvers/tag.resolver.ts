import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Tag, TagInput } from "../entities/tag.entity";
import { TagService } from "../services/tag.service";

@Resolver()
export class TagResolver {
  @Mutation(() => Tag)
  @Authorized("admin", "manager")
  async createTag(@Arg("infos") infos: TagInput) {
    const result = await new TagService().create(infos);
    return result;
  }

  @Query(() => [Tag])
  async getAllTags() {
    return await new TagService().list();
  }

  @Query(() => Tag)
  async getTagById(@Arg("id") id: string) {
    return await new TagService().find(id);
  }

  @Authorized("admin", "manager")
  @Mutation(() => Tag)
  async updateTag(@Arg("id") id: string, @Arg("infos") infos: TagInput) {
    return await new TagService().update(id, infos);
  }

  @Authorized("admin")
  @Mutation(() => Tag)
  async deleteTag(@Arg("id") id: string) {
    return await new TagService().delete(id);
  }
}