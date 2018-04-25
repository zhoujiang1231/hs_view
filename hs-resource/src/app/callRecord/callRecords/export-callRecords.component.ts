import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import aliValidators from '../../utils/ali-validators'
import {CallRecordsService} from '../callRecord.service'
import {CallRecordsCdrObComponent} from './callRecordsCdrOb.component'
import {FlatpickrOptions} from 'ng2-flatpickr'
import * as moment from 'moment'
import Russian from 'flatpickr/dist/l10n/zh.js'
import appAlert from '../../utils/alert'
import {DomSanitizer} from "@angular/platform-browser";


@Component({
    template: `
        <div class="redefine-dialog">
            <div class="w-100">
                <mat-select name="active"
                            [(ngModel)]="data.selectId" placeholder="类型">
                    <mat-option *ngFor="let item of [{name: '按日', value: 1}, {name: '按月', value: 2}]"
                                [value]="item.value">
                        {{item.name}}
                    </mat-option>
                </mat-select>
                <ng2-flatpickr *ngIf="data.selectId==1" [config]="exportDateDay"></ng2-flatpickr>
                <ng2-flatpickr *ngIf="data.selectId==2" [config]="exportDateMonth"></ng2-flatpickr>
                <button mat-button type="button" class="cancel" (click)="dialogRef.close('cancel')">取消
                </button>
                <button mat-button type="submit" class="sure" (click)="export()">导出</button>
            </div>
            <iframe [src]="downiframe" width="0" height="0" style="display: none;"></iframe>
        </div>
    `,
})
export class ExportCallRecordsComponent implements OnInit {
    public static config: MatDialogConfig = {
        disableClose: false,
        width: '500px',
        minHeight: '200px',
        data: {}
    }
    dateRangeOptions: FlatpickrOptions = {
        locale: Russian.zh,
        enableTime: false,
        noCalendar: false,
        enableSeconds: false, // disabled by default
        time_24hr: false, // AM/PM time picker is used by default
        dateFormat: 'Y-m-d',
    }
    monthRangeOptions: FlatpickrOptions = {
        locale: Russian.zh,
        enableTime: false,
        noCalendar: false,
        enableSeconds: false, // disabled by default
        time_24hr: false, // AM/PM time picker is used by default
        dateFormat: 'Y-m',
    }
    disabled = {value: false}
    exportDateDay
    exportDateMonth
    downiframe:any

    constructor(public dialogRef: MatDialogRef<ExportCallRecordsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private sanitizer: DomSanitizer,
                private callRecordsService: CallRecordsService) {
        this.downiframe = this.sanitizer.bypassSecurityTrustResourceUrl('')
        this.data.selectId = 1
        this.exportDateDay = Object.assign({}, this.dateRangeOptions,
            {defaultDate: 'today',maxDate:'today'}, {
                onChange: event => {
                    this.data.chkDate = moment(event[0]).format('YYYY-MM-DD')
                }
            })
        this.exportDateMonth = Object.assign({}, this.monthRangeOptions,
            {defaultDate: 'today',maxDate:'today'}, {
                onChange: event => {
                    this.data.chkDate = moment(event[0]).format('YYYY-MM')
                }
            })
        this.data.chkDate = moment({hour: 0}).format('YYYY-MM-DD')
    }

    ngOnInit() {

    }

    export() {
        this.disabled.value = true
        if(this.data.appId == null){
            appAlert.common.confirmWarning('请选择应用！')
            return
        }
        if(this.data.chkDate == moment({hour: 0}).format('YYYY-MM-DD')||this.data.chkDate == moment({hour: 0}).format('YYYY-MM')){
            appAlert.common.confirmWarning('当前无可用下载文件！')
            return
        }
        this.data.chkDate = new Number(this.data.chkDate.replace(/[-]/g,""))
        this.callRecordsService.exportCallrecord(this.data)
            .subscribe(page =>{
                if(page.data.result == 0){
                    this.downiframe = this.sanitizer.bypassSecurityTrustResourceUrl(page.data.data)
                }
            })
    }
}
