import { Guid } from "guid-typescript";

export class InAccountVM {
  public statusCode: number;
  public accountID: Guid;
  public email: string;
  public name: string;
  public birthDay?: Date;
  public phone: string;
  public token :string;
  public gender: string;
  public subscribe: string;
}
