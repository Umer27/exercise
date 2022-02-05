import IPayload = namespace.IPayload;

export interface IToken {
  sign(payload: IPayload)

  verify(token: string)

  decode(token: string)
}