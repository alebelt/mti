import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {map} from 'rxjs/operators';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /** Based on the screen size, switch from standard to one column per row */
  loading:boolean =false;
  isExpanded = true;
  bl:any = "option1";
  showFilters:boolean = false;
  items:any = null;

  constructor(private breakpointObserver: BreakpointObserver, private httpApiService: ApiService,) {}

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(( matches:any ) => {
      if (matches) {
        return [
          { title: 'Clicks', cols: 1, rows: 1 },
          { title: 'Impression', cols: 1, rows: 1 },
          { title: 'Table', cols: 2, rows: 2 }
        ];
      }

      return [
        { title: 'Clicks', cols: 1, rows: 1 },
        { title: 'Impression', cols: 1, rows: 1 },
        { title: 'Table', cols: 2, rows: 2 },

      ];
    })
  );


  

        ngOnInit(){
          this.httpApiService.getItems()
          .subscribe((response)=>{
            this.items = response;
            console.log(this.items)
      
         
            
          })
      
        }


  LoadData()
  { 
    console.log("Locad Click"+this.loading);
    this.loading = !this.loading;
    setTimeout(() => {
      this.loading = !this.loading;
      //this.tosterservice.success('Dashboard Updated Successfully!','System Update!')
    },5000);
     
   
  }


  openDialog() {
    // const dialogRef = this.dialog.open(DialogConfirmComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log(tabChangeEvent);
}


}
