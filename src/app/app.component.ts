import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FinanceApp';
  fixedFooterFlag: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private router: Router){

  }

  ngOnInit(){
    //console.log(this.activatedRoute.routeConfig.component.name);
    

    this.router.events.pipe(
        filter(ev => ev instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while(route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary')
      ).subscribe(data =>{
        let componentName = data.routeConfig.component.name;
        switch(componentName){
          case "HomeComponent":
            this.fixedFooterFlag = true;          
            break;
          default:
            this.fixedFooterFlag = false;
            break;
        }
      });
    
  }
}
