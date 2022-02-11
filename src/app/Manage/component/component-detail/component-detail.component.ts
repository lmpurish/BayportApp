import { Component, OnInit,ViewChild,  } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ComponentServiceService } from 'src/app/services/component-service.service';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ComponentComponent } from '../component.component';
import { IComponent } from 'src/app/Interface/IComponent';
import { MoventComponent } from 'src/app/layouts/movent/movent.component';
import { PositionsComponent } from '../../positions/positions.component';
import { Position } from 'src/app/Interface/position';


@Component({
  selector: 'app-component-detail',
  templateUrl: './component-detail.component.html',
  styleUrls: ['./component-detail.component.css']
})
export class ComponentDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ComponentDetailComponent>, private dialog: MatDialog,public services: ComponentServiceService) { }

  componentDetail: IComponent=new IComponent;
  displayedColumns: string[] = ['rack', 'boxes', 'quantity', 'actions'];
  dataSource : MatTableDataSource<Position>;
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.chargeComponent();
  }

  onClose() {
    this.dialogRef.close();
  }

  movent(action: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height= "50%";
    this.dialog.open(MoventComponent, dialogConfig);
  }

  chargeComponent(){
    this.services.getComponent(this.services.componentInUse).subscribe(data=> {
      this.componentDetail = data;
      console.log(this.componentDetail.positions)
      this.dataSource = new MatTableDataSource(this.componentDetail.positions);
      
    })
  }
  quantity(){
    var qty=0; 
    if(this.componentDetail !=null){
      for (let partial of this.componentDetail.positions){
       qty = partial.quantity + qty;
      }
      return qty;
    }
    return 0;
  }
  
}
