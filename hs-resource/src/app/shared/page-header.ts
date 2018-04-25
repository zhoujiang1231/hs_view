import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core'
import {Router} from '@angular/router'

@Component({
  selector: 'app-page-header',
  templateUrl: 'page-header.html',
  styleUrls: ['page-header.less'],
  encapsulation: ViewEncapsulation.None
})

export class PageHeaderComponent implements OnInit {
  @Input() title?: string
  @Input() rightButtons?: any  // header 右边的数组，从左到右依次排列
  @Input() leftButtons?: any // header左侧按钮
  @Input() permission?: any = 1 // 根据权限判断是否显示
  @Output() tapRightBtn = new EventEmitter()// 有list选择item时

  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }

  clickRightBtn(action: string) {
    this.tapRightBtn.emit(action)
  }

}
