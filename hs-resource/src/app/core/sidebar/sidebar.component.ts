import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core'
import {DataService} from '../services/data.service'
import {Router} from '@angular/router'
import {PerfectScrollbarConfigInterface, PerfectScrollbarDirective} from 'ngx-perfect-scrollbar'

@Component({
  selector: 'app-side',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.less'],
})

export class SideComponent implements OnInit {
  @Output() setOpenSideValue = new EventEmitter()
  @ViewChild(PerfectScrollbarDirective) scrollBar: PerfectScrollbarDirective
  config: PerfectScrollbarConfigInterface = {
    maxScrollbarLength: 100,
    suppressScrollX: true, // 禁止x轴滚动
  }
  sideOpened = false
  navTabs: any

  constructor(private dataService: DataService,
              private router: Router,
              ) {
    this.navTabs = this.dataService.navTabs
  }

  ngOnInit() {
    // this.dataService.changeLeft(180)
    this.dataService.changeLeft(50)
    this.initMenu()
  }

  initMenu() {
    const activeIndex = this.navTabs.findIndex((tab: any) => tab.children.find(it => this.router.url.indexOf(it.link) !== -1))
    // Debug.log('activeIndex', activeIndex)
    // 滚动到activeTab，40为每个主tab的高度
    this.scrollBar.scrollTo(0, (activeIndex + 1) * 40, 500)
    // console.log(this.navTabs)
    // let activeTab = this.navTabs.find((tab: any) => tab.children.find(it => this.router.url.indexOf(it.link) !== -1))
    let activeTab = this.navTabs[activeIndex]
    if (activeTab && activeTab.show) {
      activeTab.open = true
    } else {
      const showNavs = this.navTabs.filter((tab: any) => tab.show)
      if (showNavs.length > 0) {
        activeTab = showNavs[0]
        if (activeTab) {activeTab.open = true}
      }
    }
  }

  foldSide() {
    this.sideOpened = !this.sideOpened
    this.setOpenSideValue.emit(this.sideOpened)
    if (this.sideOpened) {
      this.dataService.changeLeft(180)
    } else {
      this.dataService.changeLeft(50)
    }
  }

  openMenu(index) {
    if (this.navTabs[index].open === false) {
      this.navTabs[index].open = true
      this.navTabs.forEach((nav) => {
        if (nav.title !== this.navTabs[index].title && nav.show === true) {
          nav.open = false
        }
      })
    } else {
      this.navTabs[index].open = false
    }
  }

  // changeActive(navTabs, item) {
  //   item.choosed = true
  //   navTabs.forEach((navTab) => {
  //     navTab.children.forEach((nav) => {
  //       if (nav.name !== item.name) {
  //         nav.choosed = false
  //       }
  //     })
  //   })
  // }
}


