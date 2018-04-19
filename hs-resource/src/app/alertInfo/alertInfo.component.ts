import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import {AlertNewInfoDialogComponent} from './alert-new-alertInfo.dialog'
import {AlertInfoOperateService} from './alertInfo.service'
import * as moment from 'moment'

@Component({
  selector: 'app-alert-info',
  templateUrl: 'alertInfo.component.html',
  styleUrls: ['alertInfo.component.less']
})

export class AlertInfoComponent implements OnInit {
  alertInfo: any[] = [] /**table数据**/
  params: any = {pageSize: 20, currentPageNo: 1} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
  levels = []
  types = []
  acks = []
  isEmpty = 1
  loadingIndicator = true


  constructor(public _dialog: MatDialog,
              private alertInfoOperateService: AlertInfoOperateService) {
    this.alertInfo = this.alertInfoOperateService.alertInfo
  }

  ngOnInit() {
    this.levels = ['警告', '错误']
    this.types = ['系统', '业务', '自定义']
    this.acks = ['已处理', '未处理']
  }

  /**加载 告警信息 数据**/
  reloadAlertInfoCount() {
    this.alertInfoOperateService.reloadRepOperate(this.params)
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        if (page.data.status === 0) {
          this.isEmpty = 0
          this.alertInfo = [...page.data.result]
          this.formatData(this.alertInfo)
          this.loadingIndicator = false

        }
      })
  }

  /**格式化数据：数据解析**/
  formatData(rows) {
    rows.forEach(item => {
      this.formatRow(item)
    })
  }

  formatRow(item) {
    item.levelName = this.levels[item.level - 1]
    item.typeName = this.types[item.type - 1]
    item.ackName = this.acks[item.ack - 1]
    item.createTimeName = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
  }

  /**点击 顶部右侧"新建"按钮**/
  onClickBtnWithAction(event) {
    if (event === 'add') {
      this.newDialog()
    }
  }

  /**打开 新建dialog**/
  newDialog() {
    const config = AlertNewInfoDialogComponent.config
    let dialogRef = this._dialog.open(AlertNewInfoDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== 'cancel') {
        // console.log('确定', result)
        this.alertInfoOperateService.addAlertInfo(result)
      }
      config.data = {}
      dialogRef = null
    })
  }

  /**点击 搜索按钮**/
  search() {
    // console.log('点击搜索按钮时的params', this.params)
    this.reloadAlertInfoCount()
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    // console.log('修改每页展示的数据条数', this.params)
    this.reloadAlertInfoCount()
  }

  /**操作按钮：处理**/
  operateHandle(row) {
    // console.log('点击操作按钮-处理', row)
    row.ack = 1
    this.formatRow(row)
    this.alertInfoOperateService.operateAlertInfo(row.id)
  }
}
