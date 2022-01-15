import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CovidReport } from 'src/models/covid-report.model';
import { API_URL } from 'src/utilities/app.constants';

@Injectable({
  providedIn: 'root',
})
export class CovidReportService {
  constructor(private http: HttpClient) {}

  getAll(reqObj: any) {
    return this.http.get<CovidReport[]>(API_URL.COVID.GET_ALL, {
      params: reqObj,
    });
  }
}
