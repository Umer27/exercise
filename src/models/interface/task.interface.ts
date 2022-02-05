export interface ITask {
  id: number,
  userId: number,
  name: string
}

export type CreateTask = Pick<ITask, "name">

export type ResponseTask = Omit<ITask, "userId">

export interface ITaskResponse {
  task: ResponseTask
}

export interface ITaskListResponse {
  task: ResponseTask[]
}