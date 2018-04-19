import {Component, OnInit} from '@angular/core'
import {NewNetDialogComponent} from './dialogs/new-dock-net.dialog'
import {MatDialog} from '@angular/material'
import {DockNetService} from './dock-net.service'
import appAlert from '../utils/alert'
import {FileUploader} from 'ng2-file-upload'
import {ConstantService} from '../core/services/constant.service'
import {ConnectionService} from '../core/services/connection.service'
import appUtil from '../utils/pro-util'

@Component({
  selector: 'app-dock-net',
  templateUrl: 'dock-net.component.html',
  styleUrls: ['dock-net.component.less']
})

export class DockNetComponent implements OnInit {
  dockNetData: any[]
  params: any = {pageSize: 20, currentPageNo: 1} /**请求后端数据的参数**/
  isActive // 是否激活
  statuses
  loadingIndicator = true
  isPermission// 是否有权限
  isSpinner = 1// 加载进度
  totalCount = 0
  uploader: any
  errFiles: any = []
  successFiles: any = []
  noPermissionFiles: any = []

  constructor(public _dialog: MatDialog,
              private dockNetService: DockNetService,
              private connectionService: ConnectionService) {
    this.dockNetData = this.dockNetService.dockNetData
    this.uploader = new FileUploader({
      url: ConstantService.HOST + '/api/system/gateways/import',
      method: 'POST',
      itemAlias: 'file',
    })
  }

  ngOnInit() {
    this.reload()
    this.isActive = ['未激活', '已激活']
    this.statuses = ['不正常', '正常']
    this.uploadFile()
  }

  /**格式化数据：是否激活解析（1激活，0未激活）**/
  formatData(rows) {
    rows.forEach(item => {
      item.activeName = this.isActive[item.active]
      item.statusName = this.statuses[item.status]
    })
  }

  /**加载数据 网关列表数据**/
  reload() {
    this.dockNetService.reloadDockNet(appUtil.filterParams(this.params))
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        if (page.data.status === 0) {
          this.isSpinner = 0
          if (page.data.permission === 0) {
            this.isPermission = 1
            this.dockNetData = [...page.data.result]
            this.formatData(this.dockNetData)
            this.loadingIndicator = false
          } else if (page.data.permission === -1) {
            this.isPermission = 0
          }
        }
      })
  }

  /**点击 顶部右侧"新建"按钮**/
  onClickBtnWithAction(event) {
    switch (event) {
      case 'renew' : {
        this.reload()
        break
      }
      case 'add' : {
        this.newDialog()
        break
      }
      case 'export' : {
        const url = ConstantService.HOST + `/api/system/gateways/export?currentPageNo=${this.params.currentPageNo}&pageSize=${this.params.pageSize}`
        this.connectionService.createA(url, '导出文件')
        break
      }
    }
  }

  /**打开 新建dialog**/
  newDialog() {
    const config = NewNetDialogComponent.config
    let dialogRef = this._dialog.open(NewNetDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== 'cancel') {
        this.reload()
      }
      config.data = {}
      dialogRef = null
    })
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    this.reload()
  }
  /**查询当前页**/
  // changePage(event) {
  //   Object.assign(this.params, {currentPageNo: event})
  //   this.reload()
  // }

  /**点击操作：编辑0、删除1**/
  operateButton(value, row, rowIndex) {
    if (value === 0) {// 编辑
      const temRow = Object.assign({}, row)
      const config = NewNetDialogComponent.config
      config.data = temRow
      let dialogRef = this._dialog.open(NewNetDialogComponent, config)
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result && result !== 'cancel') {
          this.reload()
        }
        config.data = {}
        dialogRef = null
      })
    } else {// 删除
      appAlert.common.remove('数据', () => {
        this.dockNetService.deleteDockNet(row.id)
          .subscribe(page => {
            if (page.data.status === 0) {
              appAlert.common.actionSuccess('删除网关')
              this.reload()
            }
          })
      })
    }
  }

  uploadFile() {
    this.errFiles.length = 0
    this.successFiles.length = 0
    this.noPermissionFiles.lenght = 0
    this.uploader.onAfterAddingAll = (fileItems) => {
      fileItems.forEach(item => {
        // 上传文件成功
        item.onSuccess = (response, status, headers) => {
          if (status === 200) {
            const tempRes = JSON.parse(response)
            if (tempRes.status === 0) {
              if (tempRes.permission === -1) {
                this.noPermissionFiles.push(item.file.name)
              } else {
                this.successFiles.push(item.file.name)
              }
            }
          }
        }
        // 上传文件失败
        item.onError = (response, status, headers) => {
          this.errFiles.push(item.file.name)
        }
      })
      this.uploader.uploadAll() // 开始上传
      this.uploader.onCompleteAll = () => {
        if (this.successFiles.length === this.uploader.queue.length) {
          appAlert.common.actionSuccess('上传文件！')
        } else if (this.noPermissionFiles.length === this.uploader.queue.length) {
          appAlert.common.confirmWarning('很抱歉，您没有权限进行此操作！')
        } else if (this.errFiles.length > 0) {
          const html = `<span>${this.errFiles.join(',')}&nbsp;&nbsp;上传失败！</span>`
          appAlert.common.confirmWarning(html)
        }
      }
    }
  }

}
