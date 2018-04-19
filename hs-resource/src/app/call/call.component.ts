import {Component, OnInit} from '@angular/core'
import {ConnectionService} from '../core/services/connection.service'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import appAlert from '../utils/alert'
import {SysDemoService} from '../system/demo/sys-demo.service'

@Component({
  selector: 'app-call',
  templateUrl: 'call.component.html',
  styleUrls: [`call.component.less`]
})

export class CallComponent implements OnInit {
  params: any = {timeout: 30000, name1: 'X-Asterisk-enterprise_id', name2: 'X-Asterisk-call_type', name3: 'sipp'}
  targetForm: FormGroup
  urlsArr: any = []
  disabled = {value: false}

  constructor(private connectionService: ConnectionService,
              private fb: FormBuilder,
              private sysDemoService: SysDemoService) {
    this.targetForm = fb.group({
      to: ['', Validators.required],
      from: ['', Validators.required],
      url: ['', Validators.required],
      timeout: ['', Validators.required],
      name1: ['', Validators.required],
      value1: ['', Validators.required],
      name2: ['', Validators.required],
      value2: ['', Validators.required],
      name3: ['', Validators.required],
      value3: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.reloadSysDemoCount()
  }

  /**请求实例数据，获得url默认值**/
  reloadSysDemoCount() {
    this.urlsArr.length = 0
    this.sysDemoService.reloadSysDemo({pageSize: 1000, currentPageNo: 1})
      .subscribe(page => {
        if (page.data.status === 0) {
          if (page.data.permission === 0) {
            page.data.result.forEach(item => {
              if (item.status === 1) {
                this.urlsArr.push(`${item.ip}:${item.port}`)
              }
            })
            if (this.urlsArr.length > 0) {
              this.params.url = this.urlsArr[0]
            }
          } else if (page.data.permission === -1) {
            this.params.url = ''
          }
        }
      })
  }

  /**点击 呼叫**/
  reload() {
    this.disabled.value = true
    const path = '/api/route/call'
    this.params.timeout  = Number(this.params.timeout)
    this.connectionService.get(path, {params: this.params})
      .then(res => {
        this.disabled.value = false
        if (res && res.data.status === 0) {
          appAlert.common.actionSuccess('呼叫测试')
        } else if (res && res.data.status === -1) {
          appAlert.common.actionFailed('呼叫测试')
        }
      })
      .catch(err => {
        this.disabled.value = false
        appAlert.common.actionFailed('呼叫测试')
      })
  }
}
