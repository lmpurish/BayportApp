import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewComponentComponent } from './new-component/new-component.component';
import { ComponentServiceService } from 'src/app/services/component-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { PositionsComponent } from '../positions/positions.component';
import { PositionService } from 'src/app/services/position.service';


@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.css']
})
export class ComponentComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'itemCode', 'barCode', 'perCarton', 'quantity', 'actions'];
  dataSource : MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string 
  constructor(private dialog: MatDialog, public service:ComponentServiceService, public positionService: PositionService) { }
  

  ngOnInit(): void {
    this.chargeList();
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
    dialogConfig.width = "60%";
    this.dialog.open(NewComponentComponent, dialogConfig);
  }
  
  updatePosition(component){
    this.positionService.chargePosition(component);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(PositionsComponent,dialogConfig);

  }

  chargeList() {
    this.service.getComponents().subscribe(list => {
      this.dataSource = new MatTableDataSource(list as ComponentComponent[]);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
    );
  }



}
