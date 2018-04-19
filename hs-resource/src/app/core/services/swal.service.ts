import {Injectable} from '@angular/core'
import swal from 'sweetalert2'

@Injectable()
export class SwalService {

  hint(type, title) {
    if (type != 'success') {
      swal({
        type: type,
        title: title,
        showConfirmButton: true,
        confirmButtonText: '确定',
        timer: 300000
      }).catch(timeout => {
      })
    } else {
      swal({
        type: type,
        title: title,
        showConfirmButton: true,
        confirmButtonText: '确定',
        timer: 3000
      }).catch(timeout => {
      })
    }
  }
}
