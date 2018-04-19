import {Component, enableProdMode, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import aliValidators from '../../utils/ali-validators'
import {DockGroupService} from '../../dock/dock-group.service'
import {BusinessRouterService} from '../business-router.service'
import {FlatpickrOptions} from 'ng2-flatpickr'
import Russian from 'flatpickr/dist/l10n/zh.js'
import * as moment from 'moment'
import {SwalService} from '../../core/services/swal.service'
import appAlert from '../../utils/alert'

enableProdMode()
@Component({
  selector: 'app-new-business-router',
  templateUrl: 'new-business-router.dialog.html',
  styles: [`
    mat-checkbox{
      margin-right: 25px;
    }
  `]
})
export class NewBusinessRouterDialogComponent implements OnInit {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '700px',
    minHeight: '200px',
    data: {}
  }
  timeOptions: FlatpickrOptions = {
    locale: Russian.zh,
    enableTime: true,
    noCalendar: true,
    time_24hr: true, // AM/PM time picker is used by default
    dateFormat: 'H:i',
    defaultDate: 'today',
  }
  startTimeOptions
  endTimeOptions
  timeStart
  timeEnd
  targetForm: FormGroup
  dockGroupData
  disabled = {value: false}

  hasCondition = {time: 0, clidAv: 0, telAv: 0}// 判断是否显示"时间条件\主、被叫号码av条件"选择框
  dayOfWeek = []
  timeRegexArr = []// 临时存放timeRegex的容器array
  clidAvArr = []// 临时存放clidAv的容器array
  telAvArr = []// 临时存放telAv的容器array

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<NewBusinessRouterDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dockGroupService: DockGroupService,
              private businessRouterService: BusinessRouterService,
              private swal: SwalService) {
    this.targetForm = fb.group({
      serviceId: ['', Validators.compose([Validators.required, aliValidators.number])],
      priority: ['', Validators.compose([Validators.required, aliValidators.number])],
      telRegex: [''],
      clidRegex: [''],
      trunkGroupId: ['', Validators.compose([Validators.required, aliValidators.number])],
      description: [''],
      active: ['', Validators.required],
      tags: [''],
      timeRegex: [''],
      clidAv: [''],
      telAv: [''],
    })
    this.dockGroupData = this.dockGroupService.dockGroupData
    this.startTimeOptions = Object.assign({}, this.timeOptions, {
      onChange: event => {
        this.timeStart = moment(event[0]).format('HH:mm')
      }
    })
    this.endTimeOptions = Object.assign({}, this.timeOptions, {
      onChange: event => {
        this.timeEnd = moment(event[0]).format('HH:mm')
      }
    })
  }

  ngOnInit() {
    this.timeStart = moment({hour: 0, minute: 0}).format('HH:mm')
    this.timeEnd = moment({hour: 0, minute: 0}).format('HH:mm')
    this.dockGroupService.reloadDockGroup('')
    if (this.data.id && this.data.clidAv) {
      this.clidAvArr.push(...JSON.parse(this.data.clidAv))
    }
    if (this.data.id && this.data.telAv) {
      this.telAvArr.push(...JSON.parse(this.data.telAv))
    }
  }

  add(data) {
    this.disabled.value = true
    if (this.data.id) {
      const _data = {
        id: data.id,
        serviceId: data.serviceId,
        priority: data.priority,
        telRegex: data.telRegex,
        clidRegex: data.clidRegex,
        timeRegex: data.timeRegex,
        trunkGroupId: data.trunkGroupId,
        description: data.description || '',
        active: data.active,
        tags: data.tags || '',
        clidAv: data.clidAv,
        telAv: data.telAv,
      }
      this.businessRouterService.operateBusinessRouter(data)
        .then(res => {
          console.log('修改路由', res)
          if (res.data.status === 0) {
            if (res.data.permission === -1) {
              appAlert.common.confirmWarning(res.data.msg || '没有权限进行此操作！')
            } else {
              this.dialogRef.close('success')
              appAlert.common.actionSuccess('修改路由')
            }
          } else {
            this.disabled.value = false
            appAlert.common.actionFailed('修改路由')
          }
        })
        .catch(err => {
          this.disabled.value = false
          appAlert.common.actionFailed('修改路由')
      })
    } else {
      data.priority = Number(data.priority)
      this.businessRouterService.addBusinessRouter(data)
        .then(res => {
          console.log('新增路由post', res)
          if (res.data.status === 0) {
            if (res.data.permission === -1) {
              appAlert.common.confirmWarning(res.data.msg || '没有权限进行此操作！')
            } else {
              this.dialogRef.close('success')
              appAlert.common.actionSuccess('新增路由')
            }
          } else {
            this.disabled.value = false
            appAlert.common.actionFailed('新增路由')
          }
        })
        .catch(err => {
          this.disabled.value = false
          appAlert.common.actionFailed('新增路由')
      })
    }
  }


  /**重置按钮**/
  init(param) {
    this.data[param] = ''
    this[`${param}Arr`].length = 0
  }

  /**选择"星期"复选框**/
  checkboxChange(event) {
    if (event.checked) {
      this.dayOfWeek.push(event.source.value)
      this.dayOfWeek.join(',')
    } else if (!event.checked && this.dayOfWeek.length > 0) {
      const spliceItem = this.dayOfWeek.findIndex(item => item === event.source.value)
      if (spliceItem > -1) {
        this.dayOfWeek.splice(spliceItem, 1)
      }
    }
  }

  /**保存所选"时间条件"，需要先将所选条件放到array中，再清空所选项**/
  saveCondition() {
    // 判断"开始时间"是否在"结束时间"之前
    if (this.timeStart < this.timeEnd) {
      // 将timeRegex转华为array，并赋值给timeRegexArr
      if (this.data.timeRegex) {
        this.timeRegexArr = [...JSON.parse(this.data.timeRegex)]
      }
      const timeRegexItem = {
        dayOfWeek: this.dayOfWeek.join(',') || '',
        timeStart: this.timeStart || '',
        timeEnd: this.timeEnd || ''
      }
      this.timeRegexArr.push(timeRegexItem)
      this.data.timeRegex = JSON.stringify([...this.timeRegexArr])
    } else {
      this.swal.hint('warning', '"开始时间"需在"结束时间"之前！')
    }
  }

  /**保存所填写的 "主、被叫号码av条件"，需要先将所选条件放到array中，再清空所选项**/
  saveAv(event, str: string) {
    if (this.data[`${str}`]) {
      this[`${str}Arr`] = [...JSON.parse(this.data[`${str}`])]
    }
    this[`${str}Arr`].push(event)
    this.data[`${str}`] = JSON.stringify(this[`${str}Arr`])
  }
}
