import {FormControl} from '@angular/forms'

function maxLength(n) {
  return function (control: FormControl) {
    const input = control.value, e = {invalidMaxLength: true}
    if (!input) {
      return
    }
    const len = input.toString().length
    if (len > n) {
      return e
    }
  }
}

function length(n) {
  return function (control: FormControl) {
    const input = control.value, e = {invalidMaxLength: true}
    if (!input) {
      return
    }
    const len = input.toString().length
    if (len !== n) {
      return e
    }
  }
}

function number(control: FormControl) {
  const input = control.value, e = {invalidNumber: true}
  if (!control.value) {
    return
  }
  // const telPattern = /[0-9.]*/
  const telPattern = /^[0-9.]*$/
  if (!telPattern.test(input)) {
    return e
  }
}

function phone(control: FormControl) {
  const input = control.value, e = {invalidPhone: true}
  if (!control.value) {
    return e
  }
  const telPattern = /^0\d{2,3}-?\d{7,8}$/
  const phonePattern = /^1[3458][0-9]\d{8}$/
  if (!telPattern.test(input) && !phonePattern.test(input)) {
    return e
  }
}

export default {
  maxLength,
  phone,
  number,
  length,
}
