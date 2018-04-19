import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {BusinessRouterService} from '../business-router.service'
import {ConstantService} from '../../core/services/constant.service'

@Component({
  selector: 'app-add-action',
  templateUrl: 'add-action.dialog.html',
  styles: [``]
})

export class AddActionDialogComponent implements OnInit {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '500px',
    minHeight: '200px',
    data: {}
  }
  targetForm: FormGroup
  actionTypes
  addDateRow
  noop = {}
  set_var = {}
  add_prefix = {}
  add_header = {}
  remove_header = {}
  set_clid = {}
  set_dlg = {}
  set_cdr_tag = {}
  set_to_tel = {}
  noopProperty = []
  isFocus = 0// property是否是focus状态
  disabled = {value: false}
  typesArr: any [] = []

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddActionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private businessRouterService: BusinessRouterService) {
    this.targetForm = fb.group({
      type: ['', Validators.required],
      property: ['', Validators.required],
      description: [''],
      noop_nameType: [''], // 1
      noop_name: [''],
      sv_name: [''], // 2
      sv_value: [''],
      sv_valueType: [''],
      ap_value: [''], // 3
      ap_valueType: [''],
      ah_name: [''], // 6
      ah_value: [''],
      ah_valueType: [''],
      sct_name: [''], // 11
      sct_value: [''],
      sct_valueType: [''],
      rh_nameType: [''],
      rh_name: [''],
      sd_name: [''],
      sd_nameType: [''],
      sc_value: [''], // 9
      sc_valueType: [''],
      stt_name: [''], // 12
      stt_value: [''],
      stt_valueType: [''],
    })
    this.addDateRow = {routerId: this.data.routerId, actionList: []}
  }

  ngOnInit() {
    this.actionTypes = ConstantService.actionTypes
    this.typesArr = ConstantService.typesArr
  }

  /**新增Action 点击确认执行请求**/
  add(data) {
    this.disabled.value = true
    if (this.data.id) {
      // console.log(data)
      const spliceIndex = this.data.routerAction.findIndex(item => item.id === this.data.id)
      this.data.routerAction.splice(spliceIndex, 1)
    }
    this.updateAction(data)
  }

  updateAction(data) {
    const tempAdd = {
      type: data.type,
      property: data.property,
      description: data.description || ''
    }
    this.addDateRow.actionList.push(tempAdd)
    if (this.data.routerAction.length > 0) {
      this.data.routerAction.map(action => {
        const tempAction = {
          type: action.type,
          property: action.property,
          description: action.description || ''
        }
        this.addDateRow.actionList.push(tempAction)
      })
    }
    // console.log('编辑参数', this.addDateRow)
    this.businessRouterService.updateRouterAction(this.addDateRow, this.dialogRef, this.disabled)
  }

  /**timeRegex重置按钮**/
  initParamsq() {
    this.data.property = ''
    this.noopProperty.length = 0
  }
  /**1、noop【nameType、name】**/
  mergeNoopProperty(noop) {
    // console.log(noop)
    const tempNoop = {nameType: noop.noop_nameType, name: noop.noop_name}
    this.noopProperty.push(tempNoop)
    this.data.property = JSON.stringify(this.noopProperty)
  }
  /**2、set_var;6、add_header;11、set_cdr_tag;【name、value、valueType】**/
  mergeProperty(obj, str: string) {
    // console.log(obj)
    const tempSV = {name: obj[`${str}_name`], value: obj[`${str}_value`], valueType: obj[`${str}_valueType`]}
    this.data.property = JSON.stringify(tempSV)
  }
  /**3、add_prefix;9、set_clid;12、set_to_tel【valueType、value】**/
  mergeV_VTProperty(obj, str) {
    // console.log(obj)
    const tempAP = {value: obj[`${str}_value`], valueType: obj[`${str}_valueType`]}
    this.data.property = JSON.stringify(tempAP)
  }
  /**7、remove_header;10、set_dlg【nameType、name】**/
  mergeRH_SDProperty(obj, str: string) {
    // console.log(obj)
    const tempRH = {nameType: obj[`${str}_nameType`], name: obj[`${str}_name`]}
    this.data.property = JSON.stringify(tempRH)
  }
}
