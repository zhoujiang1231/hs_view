import {Component, Input, Output, OnInit, EventEmitter, OnChanges} from '@angular/core'
import {SwalService} from '../../core/services/swal.service'

@Component({
  selector: 'app-pagination',
  template: `
    <div id="sip-pagination">
      <div class="clear-float">
        <pagination *ngIf="cg"
          [boundaryLinks]="true"
          [directionLinks]="true"
          [totalItems]="comTotalCount"
          [(ngModel)]="pageParams.currentPageNo"
          [rotate]="true"
          [itemsPerPage]="limit || 20"
          [maxSize]="5"
          (pageChanged)="listPageChange($event)"
          previousText="&lsaquo;"
          nextText="&rsaquo;"
          firstText="&laquo;"
          lastText="&raquo;">
        </pagination>
        <pagination *ngIf="!cg"
                    [boundaryLinks]="true"
                    [directionLinks]="true"
                    [totalItems]="comTotalCount"
                    [(ngModel)]="pageParams.currentPageNo"
                    [rotate]="true"
                    [itemsPerPage]="limit || 20"
                    [maxSize]="5"
                    (pageChanged)="listPageChange($event)"
                    previousText="&lsaquo;"
                    nextText="&rsaquo;"
                    firstText="&laquo;"
                    lastText="&raquo;">
        </pagination>
      </div>
      <div class="left-pagination">
        共&nbsp;{{comTotalCount}}&nbsp;条数据，转至第&nbsp;
        <input type="text" [(ngModel)]="jumpPage" (keyup)="myKeyup($event,jumpPage)">&nbsp;页，
      </div>
      <div style="display: inline-block;">
        每页显示&nbsp;
        <button class="pageLimit" mat-raised-button [matMenuTriggerFor]="menu" aria-label="Open basic menu">
          {{limit}}
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item *ngFor="let skip of [10, 20, 50, 100]"
                  [disabled]="skip == limit" (click)="changeLimit(skip)">
            {{skip}}
          </button>
        </mat-menu>&nbsp;条。
      </div>
    </div>
  `,
  styles: [`
    /**设置页面底部左右两侧的 分页 样式**/
    #sip-pagination {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: #fff;
      padding-top: 10px;
      border-top: 1px solid #ddd;
      font-size: 1.25rem;
    }
    .pageLimit {
      min-width: 30px;
      height: 25px;
      line-height: 25px;
      box-shadow: none;
      border: 1px solid #ddd;
      font-weight: normal;
    }
    .clear-float {
      display: inline-block;
    }
    .left-pagination {
      margin-left: 5px;
      display: inline-block;
    }
    input {
      width: 30px;
      height: 25px;
      outline: none;
      text-align: center;
      border: 1px solid #ddd;
      border-radius: 2px;
    }
  `]
})

export class PaginationComponent {
  @Input() comTotalCount/*总数据条数，设置默认是0*/
  @Input() pageParams
  @Output() pageParamsChange = new EventEmitter/*指定跳转页后所传递的参数（new）*/
  @Output() limitChange = new EventEmitter()
  jumpPage: number = null/*input中输入的将跳转的页码*/
  limit = 20
  cg: any = false

  constructor(private swalService: SwalService) {}

  /**点击跳转到指定页；当点击 pagination某个页面时，重新加载页面数据*/
  listPageChange(page) {
    // console.log(page)// {page: 2, itemsPerPage: 10}
    if (this.comTotalCount > 0) {
      this.pageParams.currentPageNo = page.page
      this.pageParamsChange.emit(this.pageParams)
    }
  }

  /**回车 加载指定页数据**/
  myKeyup(event: any, jumpPage) {
    // console.log('event', event)
    // console.log('jumpPage', parseInt(jumpPage, 10))
    if (event ? event.keyCode : event.which === 13) {
      if (Number.isInteger(parseInt(jumpPage, 10)) && parseInt(jumpPage, 10) > 0) {
        this.listPageChange(jumpPage)
        this.pageParams.currentPageNo = parseInt(jumpPage, 10)
      } else {
        this.swalService.hint('error', '您输入的页码格式不正确！')
      }
    }
  }

  changeLimit(skip) {
    this.cg = !this.cg
    this.pageParams.currentPageNo = 1
    this.jumpPage = null
    this.limit = skip
    this.limitChange.emit(skip)
  }
}
