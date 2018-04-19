import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-system-real-time',
  templateUrl: 'system-real-time.component.html',
})
export class SystemRealTimeComponent implements OnInit {
  menu: any[] = [
    {name: '实时统计组管理', choosed: true, link: '/index/system/manage/groups'},
    {name: '实时统计管理', choosed: false, link: '/index/system/manage/list'},
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
