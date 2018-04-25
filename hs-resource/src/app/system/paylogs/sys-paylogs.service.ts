import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'
import {SystemPaylogsComponent} from "./system-paylogs.component";

@Injectable()
export class SysPaylogsService {
  @observable sysPaylogsData: any[] = []
    operateTypeDesc
  constructor(private connectionService: ConnectionService) {
      this.operateTypeDesc = ['','到账充值','充值赠送','充值撤销','扣费','客户调账']
  }

  /**获取消费日志：get**/
  reloadPaylogsData(params) {
    const path = '/paylogs'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      if (page.data.result === '0') {
        if (page.data.permission === 0) {/*请求数据"成功"*/
          this.sysPaylogsData.length = 0
          this.sysPaylogsData.push(...page.data.list)
            this.formatData(this.sysPaylogsData)
        }
      } else {
        this.connectionService.isLoginByResult(page.data.description, '消费日志')
      }
    }, err => {
      appAlert.common.actionFailed('请求"消费日志"')
    })
    return configsObservable
  }

    formatData(rows){
        rows.forEach(item =>{
            if(item.operateType === 4){
                var day = new Date(item.createTime)
                day.setMonth(day.getMonth()-1)
                var year = day.getFullYear()
                var month = (day.getMonth()+1).toString()
                if(month.length==1){
                    month = '0'+month
                }
                item.operateTypeDesc = this.operateTypeDesc[item.operateType]+year+'-'+month
            }
            else {
                item.operateTypeDesc = this.operateTypeDesc[item.operateType]
            }
        })
    }


}
