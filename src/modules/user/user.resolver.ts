import { GqlAuthGuard } from '@guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { PaginationArgs } from '@shared/pagination/pagination-args';
import { CreateUserInput } from './dto/create-user.input';
import { GetUserInput } from './dto/get-user.input';
import { UpdatePasswordInput, UpdateUserInput } from './dto/update-user.input';
import { User } from './user.model';
import { UserConnection } from './user.pagination';
import { UserRepository } from './user.repository';

@Resolver((of)=> User)
export class UserResolver {
    constructor(
        private userRepository: UserRepository
    ){}

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => User)
    async createUser(
        @Args('data') data: CreateUserInput
    ): Promise<User>{
        const user = await this.userRepository.create(data);
        return user;
    }
    
    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => User)
    async removeUser(
      @Args('id') id: string,
    ): Promise<User> {
      const user = await this.userRepository.delete(id)
      return user
    }
  
    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => User)
    async updateUser(
      @Args('id') id: string,
      @Args('data') data: UpdateUserInput,
    ): Promise<User> {
      const user = await this.userRepository.updateOne(id, {
        ...data,
      })
      return user
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => User)
    async updateUserPassword(
      @Args('id') id: string,
      @Args('data') data: UpdatePasswordInput,
    ): Promise<User> {
      const user = await this.userRepository.updatePassword(id, {
        ...data,
      })
      return user
    }

    @UseGuards(GqlAuthGuard)
    @Query((returns) => UserConnection)
    async listUsers(
        @Args() pagination: PaginationArgs,
    ): Promise<UserConnection> {
        const q = {}
        const users = await this.userRepository.list(q, pagination);
        return users;
    }

    @UseGuards(GqlAuthGuard)
    @Query((returns) => User)
    async getUser(
      @Args('query') query: GetUserInput,
    ): Promise<User> {
      return await this.userRepository.findOne({
        _id: query._id,
      })
    }
}