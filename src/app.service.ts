import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import {UserService} from "./user.service";
import {TokenService} from "./token.service";
import {CreateTask, ITask, ResponseTask} from "./models/interface/task.interface";
import {TaskService} from "./task.service";
import IUser = namespace.IUser;
import IRegisterResponse = namespace.IRegisterResponse;
import ILoginResponse = namespace.ILoginResponse;
import SecureUser = namespace.SecureUser;

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService,
              private readonly tokenService: TokenService,
              private readonly taskService: TaskService) {
  }

  registerUser(user: IUser): IRegisterResponse {
    if (this.userService.findByEmail(user.email))
      throw new UnprocessableEntityException('Email already registered')
    this.userService.push(user);
    const {password, ...registerResponse} = user
    return {user: registerResponse}
  }

  loginUser(user: SecureUser): ILoginResponse {
    return {jwt: this.tokenService.sign(user)}
  }

  createUserTask(task: CreateTask, user: SecureUser): ResponseTask {
    this.taskService.push({
      id: this.taskService.generateId(),
      name: task.name,
      userId: user.id
    })
    return this.taskService.getRecentAddedTask()
  }

  getUserTasks(user: SecureUser): ResponseTask[]{
    return this.taskService.findUserTasks(user.id)
  }

}
