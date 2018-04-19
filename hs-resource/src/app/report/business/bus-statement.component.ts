import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-bus-statement',
  templateUrl: 'bus-statement.component.html',
})
export class BusStatementComponent implements OnInit {
  menu: any[] = [
    {name: '业务日报表', choosed: true, link: '/index/report/bus/day'},
    {name: '业务月报表', choosed: false, link: '/index/report/bus/month'},
  ]
  isShow = true
  constructor() { }

  ngOnInit() {
    const href = window.location.href
    /*判断刷新时的链接，从而指定当前三级菜单是否被选中*/
    this.menu.map(item => {
      item.choosed = false
      if (href.indexOf(item.link) > 1) {
        item.choosed = true
      }
    })
  }

  hideMenu(isShow) {
    this.isShow = isShow
  }
}
