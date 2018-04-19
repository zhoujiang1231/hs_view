import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material'

@Component({
  selector: 'app-redis',
  template: `
    <div class="redefine-dialog ">
      <h1 class="dialog-head">{{data?.key}}对应的value</h1>
      <div *ngIf="data.name === 'redis'" class="w-100">{{data?.redis || '暂无数据'}}</div>
      <div *ngIf="data.name === 'number'" class="w-100">
        <!--{-->
        <p *ngFor="let item of redisArr">{{item.key}} : {{item.value}}</p>
        <!--}-->
      </div>
    </div>
  `,
  styles: [`
    p{
      /*width: 600px;*/
      margin-bottom: 0 !important;
      word-break: break-all;
      word-wrap: break-word;
      /*white-space: pre-wrap;*/
    }
  `]
})
export class RedisDialogComponent implements OnInit {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '620px',
    minHeight: '200px',
    data: {}
  }
  redisArr: any = []

  constructor(public dialogRef: MatDialogRef<RedisDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    console.log(this.data.redis)
    Object.keys(this.data.redis).forEach(item => {
      this.redisArr.push({key: item, value: JSON.stringify(this.data.redis[item])})
    })
    console.log(this.redisArr)
  }
}
