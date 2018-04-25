import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysEnterpriseBasicMessageService {
    @observable sysEnterpriseBasicMessageData: any[] = []
    @observable departMentArr: any[] = []

    constructor(private connectionService: ConnectionService) {
        this.departMentArr.push({id: '', fullName: '全部'})
    }

    /**新增直销经理：post**/
    addDirectManager(data, dialogRef, disabled?) {
        const path = '/directManager'
        this.connectionService.post(path, data)
            .then(res => {
                console.log('新增直销经理', res)
                if (res.data.result === '0') {
                    dialogRef.close('success')
                    appAlert.common.actionSuccess('新增直销经理')
                } else {
                    if (disabled) {
                        disabled.value = false
                    }
                    console.log(res.data.description)
                    appAlert.common.actionFailed('新增直销经理')
                }
            }).catch(err => {
            if (disabled) {
                disabled.value = false
            }
            appAlert.common.actionFailed('新增直销经理')
        })
    }

    getReader(resolve, reject) {
        let reader = new FileReader();
        reader.onload = this.Onload(reader, resolve);
        reader.onerror = this.OnError(reader, reject);
        return reader;
    }

    readAsDataUrl(file) {
        let that = this;
        return new Promise(function (resolve, reject) {
            let reader = that.getReader(resolve, reject);
            reader.readAsDataURL(file);
        })
    }

    Onload(reader: FileReader, resolve) {
        return () => {
            resolve(reader.result);
        }
    }

    OnError(reader: FileReader, reject) {
        return () => {
            reject(reader.result);
        }
    }

}
