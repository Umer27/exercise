import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AppHelper} from "./app.helper";
import {UserService} from "./user.service";
import {TokenService} from "./token.service";
import {APP_GUARD} from "@nestjs/core";
import {AppConfigModule} from "./config/config.module";
import {JwtModule} from "@nestjs/jwt";
import {AppConfigService} from "./config/config.service";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./passport/local.strategy";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import {JwtStrategy} from "./passport/jwt.strategy";
import {TaskService} from "./task.service";

@Module({
  imports: [
    AppConfigModule,
    JwtModule.register({
      secret: new AppConfigService().JWT_SECRET,
      signOptions: {expiresIn: "60d"},
    }),
    PassportModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
    AppHelper,
    {provide: UserService, useValue: new UserService([])},
    {provide: TaskService, useValue: new TaskService([])},
    TokenService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AppModule {
}
