import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {SysEnterpriseAppManagerService} from './sys-enterpriseAppManager.service'
import {SysCustomerManageService} from "../customerManage/sys-customerManage.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {ConstantService} from "../../core/services/constant.service";
import {DomSanitizer} from "@angular/platform-browser";
import appAlert from "../../utils/alert";

@Component({
    selector: 'app-sys-fileList',
    template: `
        <div class="redefine-dialog">
            <h1>合同附件</h1>
            <div class="h-100 position-relative">
                <div class="row head-search-container">
                    <div class="col-6 container-input">
                        <dl>
                            <dd>
                                <input type="file" (change)="uploadFile1($event)"  multiple multiple accept=".jpg,.gif,.png,.jpeg,.pdf">
                            </dd>
                        </dl>
                    </div>
                    <div class="col-3 container-input">
                        <button mat-button class="search-button" (click)="uploadFile()">确认上传</button>
                    </div>
                </div>
            </div>
            <div class="table-container w-100">
            <ngx-datatable class="material striped"
                           [rows]="fileList"
                           [headerHeight]="30"
                           [rowHeight]="30"
                           [columnMode]="'force'"
                           [scrollbarH]="true">
                <ngx-datatable-column [name]="'文件名'" [prop]="'fileName'"></ngx-datatable-column>
                <ngx-datatable-column [name]="'操作'">
                    <ng-template let-row="row" let-rowIndex="rowIndex" ngx-datatable-cell-template>
                        <span class="linkSpan" (click)="operateFile(row,0)">查看</span>
                        <span class="linkSpan" (click)="operateFile(row,1)">下载</span>
                        <span class="linkSpan" (click)="operateFile(row,2)">删除</span>
                    </ng-template>
                </ngx-datatable-column>
            </ngx-datatable>
            <iframe [src]="downiframe" width="0" height="0" style="display: none;"></iframe>
            </div>
        </div>
    `,
})
export class SysFileListDialogComponent implements OnInit {
    public static config: MatDialogConfig = {
        disableClose: false,
        width: '500px',
        minHeight: '200px',
        data: {}
    }
    disabled = {value: false}
    fileList: any[] = []
    downiframe:any
    myfile:FileList

    constructor(private fb: FormBuilder,
                private sanitizer: DomSanitizer,
                public dialogRef: MatDialogRef<SysFileListDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private sysEnterpriseFirmMessageService: SysEnterpriseAppManagerService,
                private sysCustomerManageService:SysCustomerManageService) {
        this.downiframe = this.sanitizer.bypassSecurityTrustResourceUrl('')
    }

    ngOnInit() {
        if(LocalStorage.get('accountId')&&LocalStorage.get('appId')){
            this.reloadFileList()
        }
    }

    reloadFileList(){
        this.sysCustomerManageService.reloadFileList({accountId:LocalStorage.get('accountId'),appId:LocalStorage.get('appId')})
            .subscribe(page =>{
                this.fileList = [...page.data.list]
            })
    }

    uploadFile1(event) {
       this.myfile = event.target.files
    }

    uploadFile() {
        if(this.myfile == null||this.myfile.length==0){
            appAlert.common.confirmWarning('请选择文件!')
            return
        }
        if(this.myfile.length>0) {
            let formData: FormData = new FormData();
            formData.append('accountId', LocalStorage.get('accountId'));
            formData.append('appId', LocalStorage.get('appId'));
            for (var i = 0; i < this.myfile.length; i++) {
                let file: File = this.myfile[i];
                formData.append('file', file);
            }
            console.log(formData)
            this.sysCustomerManageService.upLoadFile(formData)
                .subscribe(page => {
                    if (page.data.result == 0) {
                        this.reloadFileList()
                    }
                })
        }
    }

    previewPic(event) {
    }

    /*0查看文件 1下载文件 2删除文件*/
    operateFile(row,value){
        if(value == 0){
            window.open(ConstantService.HOST+row.path,'_blank')
        }
        if(value == 1){
            /*this.sysCustomerManageService.downloadFile('?id='+row.id)*/
            this.downiframe = this.sanitizer.bypassSecurityTrustResourceUrl(ConstantService.HOST+'/customer/file?id='+row.id)
        }if(value == 2){
            this.sysCustomerManageService.deleteFile(row.id)
                .subscribe(page =>{
                    if(page.data.result == 0){
                        this.reloadFileList()
                    }
                })
        }
    }
}
