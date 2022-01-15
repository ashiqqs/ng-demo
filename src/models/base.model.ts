export abstract class BaseModel {
  constructor() {
    this.id = '0';
    this.createdOn = new Date();
    this.updatedOn = null;
  }

  id: string;
  createdOn: Date;
  updatedOn: Date | null;
}
