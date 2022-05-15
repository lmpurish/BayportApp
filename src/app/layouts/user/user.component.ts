import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['username', 'email','firstName','lastName','rol','actions'];
  dataSource :                        MatTableDataSource<UserComponent>;
  searchKey:                          string;
  @ViewChild(MatSort) sort:           MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  rolList:                            any =[];
  rolMap:                             Map<number,string> = new Map();
  
  constructor(
    public services:        UserService,
    private dialog:         MatDialog,
    private dialogService:  DialogService,
    private notification:   NotificationService

    ) 
  {

  }

  ngOnInit(): void {
    this.chargeList();
    this.refreshRoltMap();
  }

  chargeList(){
    this.services.getUsers().subscribe(list=>{
      this.dataSource           = new MatTableDataSource(list as UserComponent[]);
      this.dataSource.sort      = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.height= "80%";
    this.dialog.open(RegisterComponent, dialogConfig);
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

  refreshRoltMap(){
    this.services.getRoles().subscribe(data=>{
    this.rolList = data;
    for(let i=0; i< data.length; i++ ){
      this.rolMap.set(this.rolList[i].id, this.rolList[i].rolname);
    }
  });
  }

}
