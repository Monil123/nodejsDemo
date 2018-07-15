import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  _url: String;
  result: any;

  constructor(private _http: HttpClient) {
    this._url = window.location.origin;
    if(this._url.indexOf('localhost') !== -1) {
      this._url = 'http://localhost:3000'
    }
  }

  addDataTestApi(value: Number) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let body = { 'value': value };
    return this._http.post(this._url + '/add', body, { headers: headers }).pipe(
      map((res: Response) => this.result = res)
    );
  }

  fetchEmployees() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.get(this._url + '/api/employees', { headers: headers }).pipe(
      map((res: Response) => this.result = res)
    );
  }
}
