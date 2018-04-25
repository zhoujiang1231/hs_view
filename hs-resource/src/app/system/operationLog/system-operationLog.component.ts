import {Component, OnInit} from '@angular/core'
import {SysOperationLogService} from "./sys-operationLog.service";
import Russian from 'flatpickr/dist/l10n/zh.js'
import * as moment from "moment";
import {FlatpickrOptions} from "ng2-flatpickr";

@Component({
    selector: 'app-system-product',
    templateUrl: 'system-operationLog.component.html',
    styleUrls: ['system-operationLog.component.less']
})

export class SystemOperationLogComponent implements OnInit {
    sysOperationLogData: any[] = []
    params: any = {limit: 10, start: 0}
    /**请求后端数据的参数**/
    totalCount = 0
    /*总数据条数，设置默认是0*/
    loadingIndicator = true
    isPermission = 1// 是否有权限
    isSpinner // 加载进度
    dateRangeOptions: FlatpickrOptions = {
        locale: Russian.zh,
        enableTime: true,
        noCalendar: false,
        enableSeconds: true, // disabled by default
        time_24hr: true, // AM/PM time picker is used by default
        dateFormat: 'Y-m-d H:i:S',
    }
    startTimeOptions
    endTimeOptions

    constructor(private sysOperationLogService: SysOperationLogService) {
        this.startTimeOptions = Object.assign({}, this.dateRangeOptions,
            {defaultDate: 'today',maxDate:'today'}, {
                onChange: event => {
                    this.params.startTime = moment(event[0]).format('YYYY-MM-DD HH:mm:ss')
                }
            })
        this.endTimeOptions = Object.assign({}, this.dateRangeOptions,
            {defaultDate: moment({hour: 23, minute: 59, seconds: 59}).format('YYYY-MM-DD HH:mm:ss'),maxDate:moment({hour: 23, minute: 59, seconds: 59}).format('YYYY-MM-DD HH:mm:ss')}, {
                onChange: event => {
                    this.params.endTime = moment(event[0]).format('YYYY-MM-DD HH:mm:ss')
                }
            })
    }

    ngOnInit() {
        this.params.startTime = moment({hour: 0}).format('YYYY-MM-DD HH:mm:ss')
        this.params.endTime = moment({hour: 23, minute: 59, seconds: 59}).format('YYYY-MM-DD HH:mm:ss')
    }


    /**点击 顶部右侧"新建"按钮**/
    search() {
        this.reloadPaylogsData()
    }

    /**加载 预消费日志 数据**/
    reloadPaylogsData() {
        this.isSpinner = 1
        this.loadingIndicator = true
        this.sysOperationLogService.reloadPaylogsData(this.params)
            .subscribe(page => {
                this.totalCount = page.data.page.totalCount
                this.isSpinner = 0
                if (page.data.result === '0') {
                    this.isSpinner = 0
                    this.isPermission = 1
                    this.sysOperationLogData = [...page.data.list]
                    this.formatData(this.sysOperationLogData)
                    this.loadingIndicator = false
                    this.isPermission = 1
                }
            })
    }

    formatData(rows){
        rows.forEach(item =>{
            if(item.operation_type.indexOf("删除")>=0){
                item.operation_context = '删除资费为：'+ item.operation_before
            }
            else if(item.operation_type.indexOf("添加")>=0){
                item.operation_context = '添加资费为：'+ item.operation_after
            }
            else if(item.operation_type.indexOf("批量修改")>=0){
                item.operation_context = '修改为：'+ item.operation_after
            }
            else if(item.operation_type.indexOf("异常操作")>=0){
                if(item.operation_after==""||item.operation_before==""){
                    item.operation_context = '操作数据：'+ item.operation_before+item.operation_after
                }else if(item.operation_after==""&&item.operation_before==""){
                    item.operation_context = ''
                }else{
                    item.operation_context = '修改之前：'+ item.operation_before +'修改之后：'+item.operation_after
                }
            }
            else{
                item.operation_context = '修改之前：'+ item.operation_before +'修改之后：'+item.operation_after
            }
        })
    }

    /**修改每页展示的数据条数pageSize**/
    getLimit(event) {
        Object.assign(this.params, {limit: event})
        this.reloadPaylogsData()
    }

}
