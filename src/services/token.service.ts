import { Injectable } from '@angular/core';
import { DBO } from 'src/utilities/app.constants';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  get() {
    return localStorage.getItem(DBO.TOKEN);
  }
}
