import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-statement',
  templateUrl: 'com-statement.component.html',
})
export class ComStatementComponent implements OnInit {
  menu: any[] = [
    {name: '网关日报', choosed: true, link: '/index/report/enter/day'},
    {name: '网关月报', choosed: false, link: '/index/report/enter/month'},
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
