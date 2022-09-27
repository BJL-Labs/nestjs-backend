import { Injectable } from '@nestjs/common'
import { Types } from 'mongoose'
import * as bcryptjs from 'bcryptjs'
import * as rp from 'request-promise'
import { User } from './user.model'

@Injectable()
export class UserService {
  constructor() {}

  async encryptPass(pass: string) {
    const salt = await bcryptjs.genSalt(10)
    const hash = await bcryptjs.hash(pass, salt)
    return hash
  }

  async checkMatchUserPassword(
    password: string,
    userPassword: string,
  ) {
    return bcryptjs.compare(password, userPassword)
  }

  validatePassword(
    password: string,
    confirmPassword: string
  ) {
    if (password.length < 6) {
      return false
    }
    if (password !== confirmPassword) {
      return false
    }
    return true
  }

  userHasRole(user: User, tenant: Types.ObjectId, role: string) {
    // const currTenant = user.tenants.find((t) => t.tenant.equals(tenant))
    // return currTenant.roles.includes(role)
  }
}
