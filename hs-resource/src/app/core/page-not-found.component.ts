import {Component, OnInit} from '@angular/core'


@Component({
  selector: 'app-page-not-found',
  template: `
      <div class="four-zero-content"></div>
        <div class="four-zero">
            <h2>404!</h2>
            <small>找不到该页面</small>
            <footer>
                <a routerLink="/index/home">
                   <mat-icon style="color: #fff">account_balance</mat-icon>
                </a>
            </footer>
        </div>
    `,
  styles: [`
     .four-zero-content {
       background: #fff;
       padding: 20px;
     }
     .four-zero-content:before {
       height: 50%;
       width: 100%;
       position: absolute;
       top: 0;
       left: 0;
       background: #EDECEC;
       content: "";
      }
      .four-zero{
        background: #00bcd4;
        box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
        border-radius: 2px;
        position: absolute;
        top: 50%;
        margin-top: -150px;
        color: #fff;
        text-align: center;
        padding: 15px;
        height: 300px;
        width: 500px;
        left: 50%;
        margin-left: -250px;
      }
      .four-zero h2 {
        line-height: 100%;
        color: #fff;
        font-weight: 300 !important;
        font-size: 130px;
        font-family: Roboto !important;
      }
      .four-zero small{
        display: block;
        font-size: 26px !important;
        margin-top: -10px !important;
      }
      .four-zero footer {
       background: rgba(0, 0, 0, 0.13);
       position: absolute;
       left: 0;
       bottom: 0;
       width: 100%;
       padding: 10px;
      }
   `]
})

export class PageNotFoundComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {

  }
}
