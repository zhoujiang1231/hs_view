import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import {ConnectionService} from '../../core/services/connection.service'
import appAlert from '../../utils/alert'

@Injectable()
export class SysUserService {
  constructor(private connectionService: ConnectionService) {

  }

    /**修改密码：post**/
    modifyPsw(params, dialogRef, disabled?) {
        const path = '/user/updateUserPsw'
        const configsObservable = Observable.fromPromise(this.connectionService.post(path, params))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                dialogRef.close('success')
            } else {
                if (disabled) {disabled.value = false}
            }
        },err => {
            if (disabled) {disabled.value = false}
        })
        return configsObservable
    }

}
