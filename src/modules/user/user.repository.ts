import { Delete, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Types, UpdateQuery } from 'mongoose';
import { PaginationArgs } from '@shared/pagination/pagination-args';
import { Pagination } from '@shared/pagination'
import { User, UserDocument } from './user.model';
import { UserService } from './user.service';
import { UpdatePasswordInput } from './dto/update-user.input';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel('User') private userModel: Pagination<UserDocument>,
        private userService: UserService,
    ) {}

    async list(query: FilterQuery<UserDocument>, pagination: PaginationArgs){
        return await this.userModel.paginate(query, pagination)
    }

    async create(data: User): Promise<UserDocument> {
        const ecnptedPassword = await this.userService.encryptPass(data.password)
        delete data.password
        const user = new this.userModel({...data, password: ecnptedPassword});
        const userSaved = await user.save()
        return userSaved;
    }

    async updateOne(
        id: string | Types.ObjectId,
        update: UpdateQuery<UserDocument>,
    ): Promise<UserDocument> {
        return await this.userModel.findByIdAndUpdate(id, update, {
          new: true,
       })
    }

    async findByLogin(login: string): Promise<UserDocument> {
      return await this.userModel.findOne({
        $or: [
          {
            email: login,
          },
          {
            username: login,
          },
        ],
      })
    }
    
    async findById(id: string): Promise<UserDocument> {
      return await this.userModel.findById(id)
    }

    async updatePassword(
        id: string | Types.ObjectId,
        data: UpdatePasswordInput,
      ): Promise<UserDocument> {
        if (
          !this.userService.validatePassword(data.password, data.confirmPassword)
        ) {
          throw new HttpException('INVALID_PASSWORD', HttpStatus.BAD_REQUEST)
        }
    
        return await this.userModel.findOneAndUpdate({_id: id}, {
          $set: {
            password: await this.userService.encryptPass(data.password),
          },
        })
    }

    async delete(id: string): Promise<UserDocument> {
        return await this.userModel.findByIdAndRemove(id)
    }

    async findOne(
        query: FilterQuery<UserDocument>,
      ): Promise<UserDocument> {
        return await this.userModel.findOne(query)
    }
}
