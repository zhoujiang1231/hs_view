import {FormControl} from '@angular/forms'

const checkKeyCode = (event: any, inputValue) => {
  // 控制只能输入数字,小数点
  if (event.keyCode !== 46 && event.keyCode < 48 || event.keyCode > 57) {
    event.returnValue = false
  }
  // 判断当有小数点的时候不能再输小数点
  if (event.keyCode === 46 && inputValue.indexOf('.') > 0) {
    event.returnValue = false
  }
  // 判断小数点后大于两位是不能再输入
  if (inputValue && inputValue.toString().split('.').length > 1 && inputValue.toString().split('.')[1].length > 1) {
    event.returnValue = false
  }
  // 控制最大不能超过千万
  if (inputValue > 10000000) {
    event.returnValue = false
  }
}

export default {
  checkKeyCode,
}
