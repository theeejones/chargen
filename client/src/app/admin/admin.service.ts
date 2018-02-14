import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AdminService {

  constructor(private _http: Http) { }

  popTable(table: String, callback, errorback) {
    console.log("Service kicked off. - ", table);
    this._http.get("/tables/" + table).subscribe(
      (res) => {
        callback();
      },
      (err) => {
        errorback();
      }
    );
  }

}
