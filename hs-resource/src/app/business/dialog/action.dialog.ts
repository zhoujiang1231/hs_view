import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup} from '@angular/forms'
import {BusinessRouterService} from '../business-router.service'
import {AddActionDialogComponent} from './add-action.dialog'
import appAlert from '../../utils/alert'
import {ConstantService} from '../../core/services/constant.service'

@Component({
  selector: 'app-business-action-list',
  templateUrl: 'action.dialog.html',
  styleUrls: ['action.dialog.less']
})

export class BusinessActionDialogComponent implements OnInit {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '900px',
    minHeight: '200px',
    data: {}
  }
  targetForm: FormGroup
  routerAction: any[] = [] // action列表数据
  actionTypes
  params: any = {currentPageNo: 1, pageSize: 20}
  totalCount = 0  /*总数据条数，设置默认是0*/
  updateRow
  deleteDateRow
  sortDataRow

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<BusinessActionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private businessRouterService: BusinessRouterService,
              public _dialog: MatDialog) {
    this.targetForm = fb.group({
      id: [''],
      routerId: [''],
      priority: [''],
      type: [],
      property: [''],
      description: [''],
      createTime: [''],
    })
    this.updateRow = {routerId: this.data.routerId, actionList: []}
    this.deleteDateRow = {routerId: this.data.routerId, actionList: []}
    this.sortDataRow = {routerId: this.data.routerId, actionList: []}
    this.routerAction = this.businessRouterService.routerAction
  }

  ngOnInit() {
    this.reloadRouterActionCount()
    this.actionTypes = ConstantService.actionTypes
  }

  /**加载 业务路由action 数据**/
  reloadRouterActionCount(event?: any) {
    this.params.routerId = this.data.routerId
    this.businessRouterService.reloadRouterAction(this.params)
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        if (page.data.status === 0) {
          this.routerAction = [...page.data.result]
          this.formatData(this.routerAction)
        }
      })
  }

  /**格式化数据：解析 action类型**/
  formatData(rows) {
    if (rows.length > 0) {
      rows.forEach(item => {
        item.actionTypeName = this.actionTypes[item.type - 1].name
      })
    }
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1, pageSize: event})
    this.reloadRouterActionCount()
  }

  /**新增action数据**/
  addAction() {
    const config = AddActionDialogComponent.config
    config.data = {routerId: this.data.routerId, routerAction: this.routerAction}
    let dialogRef = this._dialog.open(AddActionDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== 'cancel') {
        this.reloadRouterActionCount()
      }
      config.data = {}
      dialogRef = null
    })
  }

  /**点击删除图标 删除action数据**/
  deleteAction(i) {
    this.deleteDateRow.actionList.length = 0
    appAlert.common.remove('数据', () => {
      this.routerAction.splice(i, 1)
      this.totalCount -= 1
      if (this.routerAction.length > 0) {
        this.routerAction.map(item => {
          const tempAction = {
            type: item.type,
            property: item.property,
            description: item.description || ''
          }
          this.deleteDateRow.actionList.push(tempAction)
        })
      }
      // console.log('删除参数', this.deleteDateRow)
      this.businessRouterService.updateRouterAction(this.deleteDateRow)
    })
  }

  /**使用datatable时，编辑0，删除1**/
  operateButton(value, action, i) {
    if (value === 0) {/**编辑**/
      const config = AddActionDialogComponent.config
      config.data = Object.assign({}, action, {routerId: this.data.routerId, routerAction: this.routerAction})
      let dialogRef = this._dialog.open(AddActionDialogComponent, config)
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result && result !== 'cancel') {
          this.reloadRouterActionCount()
        }
        config.data = {}
        dialogRef = null
      })
    } else if (value === 1) {// 删除
      this.deleteAction(i)
    }
  }

  /**拖动事件**/
  sortRuleSuccess() {
    this.sortDataRow.actionList.length = 0
    if (this.routerAction.length > 0) {
      this.routerAction.map(item => {
        const sortAction = {
          type: item.type,
          property: item.property,
          description: item.description || ''
        }
        this.sortDataRow.actionList.push(sortAction)
      })
    }
    // console.log('拖动排序参数', this.sortDataRow)
  }

  /**保存列表顺序**/
  save() {
    if (this.sortDataRow.actionList.length === 0) {
      this.routerAction.forEach(item => {
        const sortAction = {
          type: item.type,
          property: item.property,
          description: item.description || ''
        }
        this.sortDataRow.actionList.push(sortAction)
      })
    }
    // console.log('排序参数', this.sortDataRow)
    this.businessRouterService.updateRouterAction(this.sortDataRow)
  }
}
