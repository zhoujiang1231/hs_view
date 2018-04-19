/**
 * Created by kosei on 2017/11/9.
 */
import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-loading',
  template: `
    <div *ngIf="time" class="out" [style.top]="top ? top:'158px'">
      <mat-progress-spinner
      [mode]="'indeterminate'"
      [diameter]="60"
      [value]="50">
    </mat-progress-spinner>
    </div>
    `,
  styles: [`
      .out{
        position:absolute;
        left:calc(50% - 37px);
        top:100px;
        background: transparent;
      }
      .spinner {
        width: 60px;
        height: 60px;
        position: relative;
        margin: 100px auto;
      }
      .double-bounce1, .double-bounce2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #67CF22;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        -webkit-animation: bounce 2.0s infinite ease-in-out;
        animation: bounce 2.0s infinite ease-in-out;
      }

      .double-bounce2 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
      }

      @-webkit-keyframes bounce {
        0%, 100% { -webkit-transform: scale(0.0) }
        50% { -webkit-transform: scale(1.0) }
      }

      @keyframes bounce {
        0%, 100% {
          transform: scale(0.0);
          -webkit-transform: scale(0.0);
        } 50% {
          transform: scale(1.0);
          -webkit-transform: scale(1.0);
        }
      }

      .loader--glisteningWindow {
        width: 0.25em;
        height: 0.25em;
        box-shadow: 0.70711em 0.70711em 0 0em #2ecc71,
        -0.70711em 0.70711em 0 0.17678em #9b59b6,
        -0.70711em -0.70711em 0 0.25em #3498db, 0.70711em -0.70711em 0 0.17678em #f1c40f;
        animation: gw 1s ease-in-out infinite, rot 2.8s linear infinite;
      }
      @keyframes rot {
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes gw {
        0% {
          box-shadow: 0.70711em 0.70711em 0 0.125em #2ecc71,
          -0.70711em 0.70711em 0 0.39017em #9b59b6,
          -0.70711em -0.70711em 0 0.5em #3498db, 0.70711em -0.70711em 0 0.39017em #f1c40f;
        }
        25% {
          box-shadow: 0.70711em 0.70711em 0 0.39017em #2ecc71,
           -0.70711em 0.70711em 0 0.5em #9b59b6, -0.70711em -0.70711em 0 0.39017em #3498db, 0.70711em -0.70711em 0 0.125em #f1c40f;
        }
        50% {
          box-shadow: 0.70711em 0.70711em 0 0.5em #2ecc71,
          -0.70711em 0.70711em 0 0.39017em #9b59b6, -0.70711em -0.70711em 0 0.125em #3498db, 0.70711em -0.70711em 0 0.39017em #f1c40f;
        }
        75% {
          box-shadow: 0.70711em 0.70711em 0 0.39017em #2ecc71,
          -0.70711em 0.70711em 0 0.125em #9b59b6, -0.70711em -0.70711em 0 0.39017em #3498db, 0.70711em -0.70711em 0 0.5em #f1c40f;
        }
        100% {
          box-shadow: 0.70711em 0.70711em 0 0.125em #2ecc71,
          -0.70711em 0.70711em 0 0.39017em #9b59b6, -0.70711em -0.70711em 0 0.5em #3498db, 0.70711em -0.70711em 0 0.39017em #f1c40f;
        }
      }

    `],
})

export class LoadingComponent implements OnInit {
  @Input() top: any
  time: any = false

  ngOnInit() {
    setTimeout(() => {
      this.time = true
    }, 1000)
  }

  // <div class='loader loader--glisteningWindow'></div>
//   <mat-progress-spinner
//   [color]="'primary'"
//   [mode]="'indeterminate'"
//   [value]="50">
// </mat-progress-spinner>
  // <div class='loader loader--glisteningWindow'></div>
  //   <div class="spinner">
  //   <div class="double-bounce1"></div>
  //   <div class="double-bounce2"></div>
  // </div>
}
