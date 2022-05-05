import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['username', 'email','firstName','lastName','rol'];
  dataSource : MatTableDataSource<UserComponent>;
  searchKey: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(public services: UserService,) { }

 

  ngOnInit(): void {
    this.chargeList();
  }

  chargeList(){
    this.services.getUsers().subscribe(list=>{
      this.dataSource = new MatTableDataSource(list as UserComponent[]);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
    return 1;

   

  }

  onCreate(){

  }
  onEdit(row: any){

  }

  onDelete(row: any){

  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
}
