import {Pipe, PipeTransform} from '@angular/core'
import * as moment from 'moment'

/**日期格式化**/
@Pipe({name: 'dateFormat'})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, formatType: string) {
    moment.locale('ZH-cn')
    if (!value) {
      return ''
    } else {
      return moment(value).format(formatType)
    }
  }
}

/**将分钟数转化为 00：00格式**/
@Pipe({name: 'minuteFormat'})
export class MinuteFormatPipe implements PipeTransform {
  transform(value: any) {
    moment.locale('ZH-cn')
    if (!value) {
      return ''
    } else {
      const hour = value / 60
      const minute = value % 60
      return this.checkTime(hour) + ':' + this.checkTime(minute)
    }
  }
  // 判断当时分秒为个位数时前面补'0'；t - 传入的时分秒
  checkTime(t) {
    if ( t < 10 ) {
      return '0' + parseInt(t).toString()
    } else {
      return parseInt(t).toString()
    }
  }
}

/**@desc 将秒数变成hh:mm:ss格式*/
@Pipe({name: 'secondFormat'})
export class SecondFormatPipe implements PipeTransform {
  transform(value: number, exponent: string) {
    moment.locale('ZH-cn')
    if (!value) {
      return ''
    } else {
      const valueSecond = value / 1000
      const hour: any = valueSecond / 3600
      const minute: any = (valueSecond % 3600) / 60
      const second: any = (valueSecond % 3600) % 60
      return this.checkTime(hour) + ':' + this.checkTime(minute) + ':' + this.checkTime(second)
    }
  }
  // 判断当时分秒为个位数时前面补'0'；t - 传入的时分秒
  checkTime(t) {
    if (t < 10) {
      return '0' + parseInt(t).toString()
    } else {
      return parseInt(t).toString()
    }
  }
}

/***将16位时间戳转化为微妙格式YYYY-MM-DD HH:mm:ss.SSS+ 'SSS'***/
@Pipe({name: 'microsecondFormat'})
export class MicrosecondFormatPipe implements PipeTransform {
  transform(value: number, formatType: string) {
    moment.locale('ZH-cn')
    if (!value || value === -1) {
      return ''
    } else {
      const temp = moment(value / 1000).format(formatType)
      const microsecond = value % 1000
      return temp + microsecond
    }
  }
}
