import { Component, OnInit,ViewChild,  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ComponentServiceService } from 'src/app/services/component-service.service';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ComponentComponent } from '../component.component';
import { IComponent } from 'src/app/Interface/IComponent';


@Component({
  selector: 'app-component-detail',
  templateUrl: './component-detail.component.html',
  styleUrls: ['./component-detail.component.css']
})
export class ComponentDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ComponentDetailComponent>, public services: ComponentServiceService) { }

  componentDetail: any | undefined;
  displayedColumns: string[] = ['rack', 'boxes', 'quantity', 'actions'];
  dataSource : MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.chargeComponent();
  }

  onClose() {
    this.dialogRef.close();
    

  }

  chargeComponent(){
    this.services.getComponent(this.services.componentInUse).subscribe(data=> {
      this.componentDetail = data;
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
