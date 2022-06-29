import { Component, OnInit,ViewChild,  } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ComponentServiceService } from 'src/app/services/component-service.service';
import { MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { IComponent } from 'src/app/Interface/IComponent';
import { Position } from 'src/app/Interface/position';
import { MoventComponent } from 'src/app/layouts/movent/movent.component';



@Component({
  selector: 'app-component-detail',
  templateUrl: './component-detail.component.html',
  styleUrls: ['./component-detail.component.css']
})
export class ComponentDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ComponentDetailComponent>, private dialog: MatDialog,public services: ComponentServiceService) { }

  componentDetail:  IComponent=new IComponent;
  displayedColumns: string[] = ['rack', 'boxes', 'quantity', ];
  dataSource :      MatTableDataSource<Position>;
  listPositions:    Position[]=[];
  picture:          string="";
  
  @ViewChild(MatSort) sort:           MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.chargeComponent();
    this.services.chargeComponent.subscribe(data => {
      this.chargeComponent();
      this.quantity();
    })
  }

  onClose() {
    this.dialogRef.close();
  }

  movent(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.height= "70%";
    this.dialog.open(MoventComponent, dialogConfig);
  }

  chargeComponent(){
    this.services.getComponent(this.services.componentInUse).subscribe(data=> {
      this.componentDetail = data;
      this.picture= data.picture;
      this.listPositions = data.positions
      this.dataSource = new MatTableDataSource(this.listPositions);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
    })
  }
  quantity(){
    var qty=0; 
    if(this.componentDetail !=null){
      for(let i=0; i< this.listPositions.length; i++ ){
        qty+= this.listPositions[i].quantity;
      }
      return qty;
    }
    return 0;
  }

  
  
  
}
