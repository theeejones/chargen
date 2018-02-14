import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private _adminService: AdminService) { }

  ngOnInit() {
  }

  popTable(table: String) {
    console.log("Component kicked off. - ", table);
    this._adminService.popTable(table,
      () => { console.log("Success!"); },
      () => { console.log("Failure :("); }
    );
  }

}
