const checkNumberKeyCode = (event: any, inputValue) => {
  // 控制只能输入数字
  if (event.keyCode < 48 || event.keyCode > 57) {
    event.returnValue = false
  }
  // 控制最大不能超过千万
  if (inputValue > 10000000) {
    event.returnValue = false
  }
}

// 去除params中的value为null，''，undefined的key
function filterParams(obj) {
  const keys = Object.keys(obj)
  keys.forEach(key => {
    const value = obj[key]
    if (isObject(value)) {filterParams(value)}
    if (isEmpty(value)) {delete obj[key]}
  })
  return obj
}

function isEmpty(input) {
  // return isObject(input) ? Object.keys(input).length === 0 : ['', undefined, null].includes(input)
  return ['', undefined, null].includes(input)
}

function isObject(input) {
  return input !== null && (!Array.isArray(input)) && typeof input === 'object'
}

// 如果是object，返回object，如果是Array，返回array中的最后一个
function filterFP(obj) {
  if (Array.isArray(obj) && obj.length) {
    return obj[obj.length - 1]
  }
  return obj
}

export default {
  filterParams,
  checkNumberKeyCode,
}
