import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {UserService} from "../user.service";
import express = require('express');
import SecureUser = namespace.SecureUser;

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(req: express.Request, email: string, password: string): Promise<SecureUser> {
    return this.userService.findByLogin({email, password})
  }
}
