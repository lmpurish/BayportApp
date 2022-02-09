import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { NewCustomnerComponent } from './new-customner/new-customner.component';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  displayedColumns: string[] = ['name', 'contact','actions'];
  dataSource : MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string 

  constructor(public services: CustomerService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.chargeList();
  }


  chargeList(){
    this.services.getCustomers().subscribe(list=>{
      console.table(list)
      this.dataSource = new MatTableDataSource(list as CustomerComponent[]);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })

    console.table(this.dataSource)

  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      dialogConfig.height= "60%";
      this.dialog.open(NewCustomnerComponent, dialogConfig);
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }


}
