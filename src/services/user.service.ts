import { Injectable } from '@angular/core';
import { UserModel } from 'src/models/user.model';
import { DBO } from 'src/utilities/app.constants';
import { LocalDbService } from './repositories/local-db.services';

@Injectable({
  providedIn: 'root',
})
export class UserService extends LocalDbService<UserModel> {
  constructor() {
    super(DBO.USERS);
  }
}
