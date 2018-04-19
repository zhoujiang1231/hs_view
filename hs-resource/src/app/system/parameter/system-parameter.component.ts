import { Component, OnInit } from '@angular/core'
import {SysParameterService} from './sys-param.service'
import {SysParamDialogComponent} from './sys-param.dialog'
import {MatDialog} from '@angular/material'

@Component({
  selector: 'app-system-parameter',
  templateUrl: 'system-parameter.component.html',
  styleUrls: ['system-parameter.component.less']
})

export class SystemParameterComponent implements OnInit {
  sysParameterData: any[] = []
  params: any = {pageSize: 20, currentPageNo: 1} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
  loadingIndicator = true
  isPermission// 是否有权限
  isSpinner = 1// 加载进度

  constructor(private sysParameterService: SysParameterService,
              public _dialog: MatDialog) {
    this.sysParameterData = this.sysParameterService.sysParameterData
  }

  ngOnInit() {
    this.reloadSysParameterCount()
  }

  /**加载 参数设置列表 数据**/
  reloadSysParameterCount() {
    this.sysParameterService.reloadSysParameter(this.params)
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        if (page.data.status === 0) {
          this.isSpinner = 0
          if (page.data.permission === 0) {
            this.sysParameterData = [...page.data.result]
            this.loadingIndicator = false
            this.isPermission = 1
          } else if (page.data.permission === -1) {
            this.isPermission = 0
          }
        }
      })
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    this.reloadSysParameterCount()
  }

  /**点击操作按钮：编辑**/
  operateButton(row , rowIndex) {
    const temRow = Object.assign({}, row)
    const config = SysParamDialogComponent.config
    config.data = temRow
    let dialogRef = this._dialog.open(SysParamDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== 'cancel') {
        const data = {
          name: result.name,
          value: result.value,
          property: result.property,
          description: result.description || ''
        }
        this.sysParameterService.operateSysParameter(data)
        this.sysParameterData.splice(rowIndex, 1, result)
        this.sysParameterData = [...this.sysParameterData]
      }
      config.data = {}
      dialogRef = null
    })
  }
}
