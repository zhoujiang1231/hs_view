/**
 * Created by kosei on 2017/5/17.
 */
import {
  Component, OnInit, Input, Output, EventEmitter
} from '@angular/core'
import {MatDialog} from '@angular/material'
import {DataService} from '../../core/services/data.service'

@Component({
  selector: 'app-second-menu',
  templateUrl: 'second-menu.component.html',
  styleUrls: ['second-menu.component.less'],
})

export class SecondMenuComponent {
  @Input() title // 菜单名
  @Input() menu // 菜单列表项
  @Output() menuHide = new EventEmitter() // 隐藏菜单
  public isShow = true
  public leftArr: any

  constructor(private dataService: DataService, public dialog: MatDialog) {
    this.leftArr = this.dataService.leftArray

  }

  chooseItem(item) {
    this.menu.map((it: any) => {
      it.choosed = false
    })
    item.choosed = true
  }

  isShowMenu() {
    this.isShow = !this.isShow
    this.menuHide.emit(this.isShow)
  }
}
