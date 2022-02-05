declare module namespace {

  export type ILogin = Omit<IUser, "id">

  export interface ILoginResponse {
    jwt: string
  }

}