import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core'
import {Router} from '@angular/router'
import {HashLocationStrategy, LocationStrategy} from '@angular/common'

@Component({
  selector: 'app-index',
  templateUrl: 'index.component.html',
  styleUrls: [
    // '../themes/material.scss',
    // '../themes/dark.scss',
    // '../themes/bootstrap.scss',
    'index.component.less'
  ],
  encapsulation: ViewEncapsulation.None,
  // providers: [
  //   Location, {
  //     provide: LocationStrategy,
  //     useClass: HashLocationStrategy
  //   }
  // ],
})

export class IndexComponent implements OnInit {
  @Input() openSide: boolean

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.openSide = false
  }

  getOpenSideValue(event) {
    this.openSide = event
  }
}
