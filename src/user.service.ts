import {Injectable, UnauthorizedException} from '@nestjs/common';
import IUser = namespace.IUser;
import ILogin = namespace.ILogin;
import SecureUser = namespace.SecureUser;

@Injectable()
export class UserService {
  constructor(private readonly userArr: IUser[]) {
  }

  generateId() {
    return this.length() + 1
  }

  push(user: IUser) {
    this.userArr.push(user)
  }

  findByLogin(login: ILogin): SecureUser {
    const user = this.userArr.find((user) => user.email === login.email && user.password === login.password)
    if(!user)
      throw new UnauthorizedException()
    const {password, ...secureUser} = user
    return secureUser
  }

  findByEmail(email: string): boolean {
    const user = this.userArr.find((user) => user.email === email)
    return !!user
  }

  findById(id: number): SecureUser {
    return this.userArr[id - 1]
  }

  length(): number {
    return this.userArr.length
  }

}