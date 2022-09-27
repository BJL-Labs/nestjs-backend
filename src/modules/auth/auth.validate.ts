import { UserRepository } from '@modules/user/user.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthValidate {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async validate({ id }) {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw Error('Authenticate validation error')
    }
    return user
  }
}
