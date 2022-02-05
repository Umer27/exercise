import {Injectable} from '@nestjs/common';
import {IToken} from "./models/interface/token.interface";
import {UserService} from "./user.service";
import {JwtService} from "@nestjs/jwt";
import IPayload = namespace.IPayload;

@Injectable()
export class TokenService implements IToken {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService,
  ) {
  }

  sign(payload: IPayload) {
    return this.jwtService.sign(payload);
  }

  verify(token: string): boolean {
    return
  }

  decode(token: string): IPayload {
    return
  }


}