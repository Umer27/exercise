import {Injectable} from '@nestjs/common';
import {ITask, ResponseTask} from "./models/interface/task.interface";

@Injectable()
export class TaskService {
  constructor(private readonly taskArr: ITask[]) {
  }

  generateId() {
    return this.length() + 1
  }

  push(task: ITask) {
    this.taskArr.push(task)
  }

  findUserTasks(userId: number): ResponseTask[] {
    const userTasks = this.taskArr.filter((tasks) => tasks.userId == userId)
    return userTasks.map(({userId, ...rest}) => rest)
  }

  length(): number {
    return this.taskArr.length
  }

  getRecentAddedTask(): ResponseTask {
    const {userId, ...task} = this.taskArr[this.length() - 1]
    return task
  }

}