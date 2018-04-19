import {Component} from '@angular/core'
import {Router} from '@angular/router'

@Component({
  selector: 'app-router',
  template: `<router-outlet></router-outlet>`,
  styles: [``]
})

export class RouterComponent {
  constructor(private router: Router) {
  }

}
