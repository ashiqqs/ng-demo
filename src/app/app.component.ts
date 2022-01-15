import { Component, OnInit } from '@angular/core';
import { CovidReport } from 'src/models/covid-report.model';
import { UserModel } from 'src/models/user.model';
import { CovidReportService } from 'src/services/covid-report.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ng-demo';
  covidReports: CovidReport[] = [];

  constructor(
    private userService: UserService,
    private covidService: CovidReportService
  ) {}
  async ngOnInit() {
    let user = new UserModel();
    user.email = 'ashiq@gmail.com';
    user.name = 'ashiq';
    user.password = 'ashiq123';
    user.role = 'superadmin';

    //await this.save(user);
    //await this.delete(5);
    //await this.update(9, user);
    //this.getAll();

    this.getCovidReport();
  }

  async getAll() {
    await this.userService.findAll().then(
      (users) => {
        console.log(users);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  async save(user: UserModel) {
    await this.userService
      .create(user)
      .then((user) => {
        console.log(user);
      })
      .catch((reason) => {
        console.error(reason);
      });
  }

  async update(id: number, user: UserModel) {
    await this.userService.update(id, user).then(
      (updated) => {
        console.log(updated);
      },
      (err) => {
        console.error(err.message);
      }
    );
  }

  async delete(id: number) {
    await this.userService.delete(id).then(
      (user) => {
        console.log(user);
      },
      (err) => {
        console.error(err.message);
      }
    );
  }

  getCovidReport() {
    const reqObj = {
      format: 'json',
    };
    this.covidService.getAll(reqObj).subscribe((results) => {
      this.covidReports = results;
    });
  }
}
