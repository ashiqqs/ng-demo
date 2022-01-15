import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
  constructor() {
    super();

    this.name = null;
    this.email = null;
    this.password = null;
    this.role = null;
  }
  public name: string | null;
  public email: string | null;
  public password: string | null;
  public role: string | null;
}
