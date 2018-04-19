import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {SysModuleService} from '../module/sys-module.service'
import {SysRoleService} from './sys-role.service'
import appAlert from '../../utils/alert'

// enableProdMode()
@Component({
  selector: 'app-divide-module',
  template: `
    <div id="divide-module" class="redefine-dialog">
      <h1 class="dialog-head">分配模块</h1>
      <div class="row">
        <div class="col-12">
          <ngx-datatable class="material"
                         [rows]="moduleArrFormat"
                         [headerHeight]="40"
                         [footerHeight]="40"
                         [rowHeight]="40"
                         [columnMode]="'force'"
                         [scrollbarH]="true"
                         [loadingIndicator]="loadingIndicator"
                         [selected]="selected"
                         [selectionType]="'checkbox'"
                         (select)='onSelect($event)'>
            <ngx-datatable-column
              [width]="40"
              [sortable]="false"
              [canAutoResize]="false"
              [draggable]="false"
              [resizeable]="false"
              [headerCheckboxable]="true"
              [checkboxable]="true">
            </ngx-datatable-column>
            <ngx-datatable-column [name]="'模块名称'" [prop]="'name'"></ngx-datatable-column>
            <ngx-datatable-column [name]="'是否可配置'">
              <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-row="row">
                <section>
                  <mat-radio-group [(ngModel)]="row.update" [disabled]="row.disabled === 1">
                    <mat-radio-button [value]="1">是</mat-radio-button>
                    <mat-radio-button style="margin-left: 30px" [value]="0">否</mat-radio-button>
                  </mat-radio-group>
                </section>
              </ng-template>
            </ngx-datatable-column>
          </ngx-datatable>
        </div>
      </div>
      <div class="dialog-bottom" style="clear:both">
        <button mat-button type="button" class="cancel" (click)="dialogRef.close('cancel')">取消</button>
        <button mat-button type="submit" class="sure" (click)="updateModule()">确定</button>
      </div>
    </div>
  `,
})
export class SysDivideModuleDialogComponent implements OnInit {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '500px',
    minHeight: '200px',
    data: {}
  }
  loadingIndicator = true
  totalCount = 0 /*总数据条数，设置默认是0*/
  selected = []
  moduleArr// 所有模块列表数据
  moduleArrFormat// 所有处理后的模块列表数据
  dividedModules// 当前角色已配置的模块数据
  selectLength = 0

  constructor(public dialogRef: MatDialogRef<SysDivideModuleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private sysModuleService: SysModuleService,
              private sysRoleService: SysRoleService) {
    this.moduleArr = this.sysModuleService.sysModuleData
    this.dividedModules = this.sysRoleService.dividedModules
  }

  ngOnInit() {
    this.reloadSysModules()
  }

  /**请求 所有模块列表**/
  reloadSysModules() {
    this.sysModuleService.reloadSysModule({pageSize: 100})
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        if (page.data.status === 0) {
          this.moduleArr = [...page.data.result]
          this.reloadDividedModules()
        }
      })
  }

  /**请求 角色已经分配的模块列表**/
  reloadDividedModules() {
    console.log(this.data.roleId)
    this.sysRoleService.reloadDividedModules({pageSize: 100, roleId: this.data.roleId})
      .subscribe(page => {
        if (page.data.status === 0) {
          this.dividedModules = [...page.data.result]
          this.formatData(this.moduleArr)
          this.loadingIndicator = false
        }
      })
  }

  /**解析 模块id 和 是否可配置**/
  formatData(rows) {
    rows.forEach(item => {
      Object.assign(item, {disabled: 1})
      if (this.dividedModules.length > 0) {
        this.dividedModules.forEach(it => {
          if (item.id === it.moduleId) {
            Object.assign(item, {update: it.update}, {disabled: 0})
            Object.assign(item, {update: it.update})
            this.selected.push(item)
            this.selectLength = this.selected.length
          }
        })
      }
    })
    this.moduleArrFormat = [...rows]
  }

  /**选中可配置项时所触发的事件**/
  onSelect({ selected }) {
    console.log(selected)
    this.selected.splice(0, this.selected.length)
    this.selected.push(...selected)
    if (selected.length > this.selectLength) {
      this.selectLength += 1
      // 遍历模块列表中所有的数据，筛选出不是seleted列表中的数据，并将它们的update设为null;将selected中的数据都设为可用状态
      this.selected.map(slt => {
        this.moduleArrFormat.map(module => {
          if (slt.id === module.id) {
            module.disabled = 0
          } else {
            // module.disabled = 1
          }
        })
      })
    } else {
      this.selectLength -= 1
      // const result = []
      for (let i = 0; i < this.moduleArrFormat.length; i++) {
        const obj = this.moduleArrFormat[i]
        const num = obj.id
        let isExist = false
        for (let j = 0; j < this.selected.length; j++) {
          const aj = this.selected[j]
          const n = aj.id
          if (n === num) {
            isExist = true
            break
          }
        }
        if (!isExist) {
          obj.update = null
        }
      }
      // console.log(result)
    }
  }

  /**点击"确认"提交，发送请求**/
  updateModule() {
    const _data = {
      roleId: this.data.roleId,
      modules: []
    }
    if (this.selected.findIndex(item => item.update !== 0 && item.update !== 1) > -1) {// 找到 update没有选择的情况
      appAlert.common.confirmWarning('请选择"是否可配置"！')
    } else {
      this.selected.map(select => {
        const temp = {moduleId: select.id, update: Number(select.update)}
        _data.modules.push(temp)
      })
      this.sysRoleService.sysManageModule(_data)
    }
  }
}
