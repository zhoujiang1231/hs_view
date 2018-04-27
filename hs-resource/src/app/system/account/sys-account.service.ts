import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysAccountService {

  constructor(private connectionService: ConnectionService) {
  }

  /**获取个人xix：get**/
  reloadCourseListData(params) {
    const path = '/course/getAllCourse'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      if (page.data.result === '0') {
        //if (page.data.permission === 0) {/*请求数据"成功"*/
      /*    this.courseListData.length = 0
          this.courseListData.push(...page.data.list)*/
        //}
      } else {
        this.connectionService.isLoginByResult(page.data.result, page.data.msg)
      }
    }, err => {
      appAlert.common.actionFailed('课程列表')
    })
    return configsObservable
  }

    /**删除课程：post**/
    deleteCourse(id) {
        const path = '/course/deleteCourse/'+id
        const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('删除成功')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.msg)
            }
        }, err => {
            appAlert.common.actionFailed('删除失败')
        })
        return configsObservable
    }

    /*修改学生个人信息：post**/
    updateStudentInfo(params) {
        const path = '/student/updateStudent'
        const configsObservable = Observable.fromPromise(this.connectionService.post(path,params))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('修改成功')
            } else {
                appAlert.common.actionFailed(res.data.msg)
            }
        }, err => {
            appAlert.common.actionFailed('修改失败')
        })
        return configsObservable
    }

    /*修改密码：post**/
    updatePsw(params) {
        const path = '/user/updateUserPsw'
        const configsObservable = Observable.fromPromise(this.connectionService.post(path,params))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('修改成功,将在2秒后重新登录',null,this.exit())
            } else {
                appAlert.common.actionFailed(res.data.msg)
            }
        }, err => {
            appAlert.common.actionFailed('修改失败')
        })
        return configsObservable
    }

    exit(){
        this.connectionService.isLoginByResult('10', '')
    }
}
