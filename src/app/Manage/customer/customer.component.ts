import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { NewCustomnerComponent } from './new-customner/new-customner.component';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  displayedColumns: string[] = ['name', 'contact','actions'];
  dataSource : MatTableDataSource<CustomerComponent>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string 

  childData: "mi prueba";

  constructor(public services: CustomerService, public dialog: MatDialog, public dialogService: DialogService, public notification:NotificationService) { }

  ngOnInit(): void {
    this.chargeList();
  }


  chargeList(){
    this.services.getCustomers().subscribe(list=>{
      this.dataSource = new MatTableDataSource(list as CustomerComponent[]);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
    return 1;

   

  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      dialogConfig.height= "60%";
      this.dialog.open(NewCustomnerComponent, dialogConfig);
  }

  onEdit(row: any){
    this.services.editMode=true;
    this.services.chargeForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height= "60%";
    this.dialog.open(NewCustomnerComponent, dialogConfig);
  }

  onDelete(id:any){
    this.dialogService.openConfirmDialog("Are you sure to delete this record? Remember it will remove your dependencie!!")
    .afterClosed().subscribe(res=>{
      if(res){
        this.services.deleteCustomer(id).subscribe(action=>{
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

  


}
