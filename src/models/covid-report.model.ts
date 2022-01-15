export class CovidReport {
  constructor() {
    this.country = null;
    this.code = null;
    this.confirmed = 0;
    this.recovered = 0;
    this.critical = 0;
    this.deaths = 0;
    this.latitude = 0;
    this.longitude = 0;
    this.lastChange = null;
    this.lastUpdate = null;
  }

  country: string | null;
  code: string | null;
  confirmed: number;
  recovered: number;
  critical: number;
  deaths: number;
  latitude: number;
  longitude: number;
  lastChange: Date | null;
  lastUpdate: Date | null;
}
