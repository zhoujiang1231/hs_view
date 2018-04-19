/**
 * Created by kosei on 2017/8/1.
 */
import {Component} from '@angular/core'
import {Router} from '@angular/router'

@Component({
  selector: 'app-home',
  template: `<router-outlet></router-outlet>`,
  styles: [``]
})

export class AppHomeComponent {
  constructor(private router: Router) {
  }

  static fun: any = []


  preview() {
  }
}
