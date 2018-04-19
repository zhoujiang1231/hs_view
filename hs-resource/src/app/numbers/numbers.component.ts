import {Component, OnInit} from '@angular/core'
import {NumbersService} from './numbers.service'
import appUtil from '../utils/pro-util'
import {LocalStorage} from '../core/services/localstorage.service'
import {NewNetDialogComponent} from '../dock/dialogs/new-dock-net.dialog'
import {MatDialog} from '@angular/material'
import {RedisDialogComponent} from './dialog/redis.dialog'

@Component({
  selector: 'app-number',
  templateUrl: 'numbers.component.html',
  styleUrls: [`numbers.component.less`]
})

export class NumbersComponent implements OnInit {
  isPermission// 是否有权限
  isSpinner// 加载进度
  phoneNumberData: any[] = []
  params: any = {} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
  loadingIndicator = true
  rightBtns: any = []
  key // redis键值

  constructor(private numbersService: NumbersService,
              public _dialog: MatDialog) {}

  ngOnInit() {
    if (LocalStorage.get('username') === 'admin') {
      this.rightBtns = [
        { title: '初始化数据', action: 'initData'},
        { title: '初始化缓存', action: 'initCache'}
      ]
    } else {
      this.rightBtns.length = 0
    }
    this.reload()
  }

  reload(event?) {
    this.isSpinner = 1
    this.loadingIndicator = true
    this.numbersService.reloadNumbers(appUtil.filterParams(this.params))
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        this.isSpinner = 0
        if (page.data.status === 0) {
          if (page.data.permission === 0) {
            this.isPermission = 1
            this.loadingIndicator = false
            this.phoneNumberData = page.data.result
          } else if (page.data.permission === -1) {
            this.isPermission = 0
          }
        }
      })
  }

  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    this.reload()
  }

  /**点击 搜索按钮**/
  search() {
    this.reload()
  }

  /**
   * 初始化号码/缓存
   * @param event
   */
  onClickBtnWithAction(event) {
    if (event === 'initData') {
      this.numbersService.init('/api/numbers/init', '数据')
    } else if (event === 'initCache') {
      this.numbersService.init('/api/numbers/cache', '缓存')
    }
  }

  myKeyup(event: any) {
    const keyCode = event ? event.keyCode : event.which
    if (keyCode === 13) {
      this.numbersService.reloadRedis({key: this.key})
        .then(res => {
          if (res.data.status === 0) {
            const config = RedisDialogComponent.config
            config.data = {name: 'redis', key: this.key, redis: res.data.result}
            let dialogRef = this._dialog.open(RedisDialogComponent, config)
            dialogRef.afterClosed().subscribe((result: any) => {
              if (result && result !== 'cancel') {
              }
              config.data = {}
              dialogRef = null
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  openDialog(row) {
    console.log(row)// {number: row.number, av: row.av}
    this.numbersService.reloadRedisByNum({id: row.id})
      .then(res => {
        console.log(res)
        if (res.data.status === 0) {
          const config = RedisDialogComponent.config
          config.data = {name: 'number', key: row.number, redis: JSON.parse(res.data.result)}
          let dialogRef = this._dialog.open(RedisDialogComponent, config)
          dialogRef.afterClosed().subscribe((result: any) => {
            if (result && result !== 'cancel') {
            }
            config.data = {}
            dialogRef = null
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
