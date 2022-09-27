import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { User } from '@modules/user/user.model'
import { UserRepository } from '@modules/user/user.repository'
import { compare } from 'bcryptjs';
import {
  LoginInput,
} from './dto/login.input'
import 'isomorphic-fetch'
const ALPHABET = '123456789ABCDFGHIJKLMQRSTUVWXYZ'
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async login({ username, password }: LoginInput): Promise<User> {
    const user = await this.userRepository.findByLogin(username)
    if (!user) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED)
    }
    const valid = await compare(password, user.password)
    if (!valid) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED)
    }
    return user
  }
}
