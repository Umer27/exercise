declare module namespace {

  export interface IUser {
    id: number;
    email: string;
    password: string
  }

  type SecureUser = Omit<IUser, "password">

  export interface IRegisterResponse {
    user: SecureUser;
  }

}