import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core'
import {Router} from '@angular/router'

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
  providers: [
    Location,
  ],
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
