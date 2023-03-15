import { Component, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import {MatAccordion} from '@angular/material/expansion';
import {MatDialog} from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent {
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  
  items:any = null;
  itemsGroups:any = null;
  isExpanded = true;
  
  
  constructor(
    private httpApiService: ApiService, public dialog: MatDialog
    ) {
  }

  ngOnInit(){
    this.httpApiService.getRequests()
    .subscribe((response)=>{
      this.items = response;
      console.log(this.items)

      //group
      const groupArrayObject = this.items.Data.reduce((group: { [x: string]: any[]; }, arr: { RequestTypeDesc: any; }) => {
 
        const { RequestTypeDesc } = arr;
      
        group[RequestTypeDesc] = group[RequestTypeDesc] ?? [];
      
        group[RequestTypeDesc].push(arr);
      
        return group;
      
      },
      
      {});

      console.log(groupArrayObject);

      this.itemsGroups = groupArrayObject
      
    })

  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
