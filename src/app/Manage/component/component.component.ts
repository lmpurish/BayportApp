import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewComponentComponent } from './new-component/new-component.component';
import { ComponentServiceService } from 'src/app/services/component-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { ComponentDetailComponent } from './component-detail/component-detail.component';
import { IProduct } from 'src/app/Interface/IProduct'; 
import { NotificationService } from 'src/app/services/notification.service';
import { DialogService } from 'src/app/services/dialog.service';



@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.css']
})
export class ComponentComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description','product', 'itemCode', 'barCode','actions'];
  dataSource : MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  productMap: Map<number,string>= new Map();
  productList:any=[];

  searchKey: string 
  constructor(private dialog: MatDialog, public service:ComponentServiceService, private dialogService: DialogService,private notification: NotificationService ) { }
  

  ngOnInit(): void {
    this.chargeList();
    this.refresshProductMap();
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.height= "80%";
    this.dialog.open(NewComponentComponent, dialogConfig);
  }
  
  details(id:any){
    this.service.setComponent(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.height= "80%";
    this.dialog.open(ComponentDetailComponent, dialogConfig);
    
  }

  chargeList() {
      this.service.getComponents().subscribe(list => {
      this.dataSource = new MatTableDataSource(list as ComponentComponent[]);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
    );
  }

  refresshProductMap(){
    this.service.getProducts().subscribe(data=>{
    this.productList=data;
    for(let i=0; i< data.length; i++ ){
      this.productMap.set(this.productList[i].id, this.productList[i].name);
    }
    
    });
  }

  onDelete(id: string){
    this.dialogService.openConfirmDialog("Are you sure to delete this record? Remember it will remove your dependencie!!")
    .afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteComponent(id).subscribe(action=>{
          this.notification.warn(':: Delete successfully');
          this.chargeList();
        })
      }
    })
  }


}
