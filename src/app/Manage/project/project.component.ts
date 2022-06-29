import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectService } from 'src/app/services/project.service';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NewProjectComponent } from './new-project/new-project.component';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  displayedColumns: string[] = ['name', 'project-manager','customer','actions'];
  dataSource : MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  customerList: any=[];
  customerMap: Map<number,string>= new Map();

  constructor(public services: ProjectService,public customerServices: CustomerService,public dialog: MatDialog, public dialogService: DialogService, public notification:NotificationService) { }

  ngOnInit(): void {
    this.chargeList();
    this.refreshCustomerMap();
    this.services.chargeProject.subscribe(data =>{
      this.chargeList();
    })
  }

  chargeList(){
    this.services.getProjects().subscribe(list=>{
      this.dataSource = new MatTableDataSource(list as ProjectComponent[]);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height= "60%";
    this.dialog.open(NewProjectComponent, dialogConfig);
  }

  onEdit(row:any){

  }
  
  onDelete(id:string){
    this.dialogService.openConfirmDialog("Are you sure to delete this record? Remember it will remove your dependencie!!")
    .afterClosed().subscribe(res=>{
      if(res){
        this.services.deleteProject(id).subscribe(action=>{
          this.notification.warn(':: Delete successfully');
          this.chargeList();
        })
      }
    })
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  refreshCustomerMap(){
    this.customerServices.getCustomers().subscribe(data=>{
    this.customerList=data;
    for(let i=0; i< data.length; i++ ){
      this.customerMap.set(this.customerList[i].id, this.customerList[i].name);
    }
    
    });
  }
}
