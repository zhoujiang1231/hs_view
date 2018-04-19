import swal from 'sweetalert2'

function yes(y) {
  return function () {
    if (y) {y()}
  }
}

function no(n) {
  return function (d) {
    if (n) {n(d)}
  }
}

export default {
  login: {
    failed: function (title, text = '',  y?, n?) {
      return swal({
        type: 'error',
        title, text,
        showConfirmButton: false,
        timer: 2000
      }).then(yes(y), no(n))
    },
    warning: function (title, text = '', y?, n?) {
      return swal({
        type: 'error',
        title, text,
        showConfirmButton: false,
        timer: 2000
      }).then(yes(y), no(n))
    },
    success: function (title, text = '',  y?, n?) {
      return swal({
        type: 'success',
        title, text,
        showConfirmButton: false,
        timer: 2000
      }).then(yes(y), no(n))
    },
  },
  common: {
    removeDetail: function (title, text, y?, n?) {
      return swal({
        title,
        text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '是的, 删除!',
        cancelButtonText: '不, 再想想',
      }).then(yes(y), no(n))
    },
    remove: function (category, y?, n?) {
      return swal({
        title: `您确定删除该${category}吗?`,
        text: `${category}删除后与${category}相关的一切将全部被删除，您确定要删除${category}吗？`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '是的, 删除!',
        cancelButtonText: '不, 再想想',
      }).then(yes(y), no(n))
    },
    batchRemove: function (category, y?, n?) {
      return swal({
        title: `您确定删除这些${category}吗?`,
        text: `${category}删除后，数据将不可恢复！`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '是的, 删除!',
        cancelButtonText: '不, 再想想'
      }).then(yes(y), no(n))
    },
    actionFailed: function (action = '删除', y?, n?) {
      return swal({
        type: 'error',
        title: `${action}失败，请稍后重试!`,
        showConfirmButton: false,
        timer: 2000
      }).then(yes(y), no(n))
    },
    actionSuccess: function (action = '删除', y?, n?) {
      return swal({
        type: 'success',
        title: `${action}成功!`,
        showConfirmButton: false,
        timer: 2000
      }).then(yes(y), no(n))
    },
    confirmWarning: function (title, text = '', y?, n?) {
      return swal({
        type: 'warning',
        title, text,
        confirmButtonText: '好的，我知道了!',
      }).then(yes(y), no(n))
    },
  }
}

