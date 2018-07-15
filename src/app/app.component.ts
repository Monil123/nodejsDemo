import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  employees: Array<String> = [];
  value: String;
  res: Number;

  constructor(private _appService: AppService) {
  }

  ngOnInit() {
    this._appService.fetchEmployees().subscribe(res => {
      for(let response of res['data']) {
        this.employees.push(response.name);
      }
    });
  }

  submit(){
    this.res = Number(this.value);
    this._appService.addDataTestApi(this.res).subscribe(res => {
      this.value = res['value'];
    });
  }
}
