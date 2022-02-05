import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {RegisterUserDto} from "./models/dto/register.user.dto";
import {UserService} from "./user.service";
import {LoginUserDto} from "./models/dto/login.user.dto";
import {Public} from "./decorators/public.decorator";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {CreateTaskDto} from "./models/dto/create-task.dto";
import {ITaskListResponse, ITaskResponse} from "./models/interface/task.interface";
import IRegisterResponse = namespace.IRegisterResponse;
import ILoginResponse = namespace.ILoginResponse;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly userService: UserService) {
  }

  @Public()
  @Post('/register')
  registerUser(@Body() registerUserDto: RegisterUserDto): IRegisterResponse {
    const {email, password} = registerUserDto
    return this.appService.registerUser({id: this.userService.generateId(), email, password})
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  loginUser(@Body() loginUserDto: LoginUserDto, @Req() {user}): ILoginResponse {
    return this.appService.loginUser(user)
  }

  @Get('/user')
  getUser(@Req() {user}) {
    return {user}
  }

  @Post('/create-task')
  createUserTask(@Body() createTaskDto: CreateTaskDto, @Req() {user}): ITaskResponse {
    return {task: this.appService.createUserTask({...createTaskDto}, user)}
  }

  @Get('/list-tasks')
  getUserTasks(@Req() {user}): ITaskListResponse {
    return {task: this.appService.getUserTasks(user)}
  }

}
