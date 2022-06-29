import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectService } from 'src/app/services/project.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ProductService } from 'src/app/services/product.service';
import { NewProductComponent } from './new-product/new-product.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-produt',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['name', 'project','description','itemCode','actions'];
  dataSource : MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  projectList: any=[];
  projectMap: Map<number,string>= new Map();

  constructor(public services:ProductService, public projectServices: ProjectService, public dialog: MatDialog, public dialogService:DialogService, public notification: NotificationService) { }

  ngOnInit(): void {
    this.chargeList();
    this.refreshProjectMap();
    this.services.chargeProduct.subscribe(data => {
      this.chargeList();
      this.refreshProjectMap();
    })
  }

  chargeList(){
    this.services.getProducts().subscribe(list=>{
      this.dataSource = new MatTableDataSource(list as ProductComponent[]);
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
    this.dialog.open(NewProductComponent, dialogConfig);
  }

  onEdit(row: any){

  }
  onDelete(id: string){
    this.dialogService.openConfirmDialog("Are you sure to delete this record? Remember it will remove your dependencie!!")
    .afterClosed().subscribe(res=>{
      if(res){
        this.services.deleteProduct(id).subscribe(action=>{
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

  refreshProjectMap(){
    this.projectServices.getProjects().subscribe(data=>{
    this.projectList=data;
    for(let i=0; i< data.length; i++ ){
      this.projectMap.set(this.projectList[i].id, this.projectList[i].name);
    }
    
    });
  }

}
