import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  preserveWhitespaces: true,
})



export class AppComponent {
  title = 'Requests';
  currentUrl:string = 'null';

 constructor(router: Router) {

    router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentUrl = router.url;
          console.log(this.currentUrl)
        }
      }
    );

  } 
}
