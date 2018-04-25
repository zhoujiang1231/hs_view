/**
 * Created by mifeng on 2017/4/10.
 */
import {Injectable} from '@angular/core'
import {FileUploader} from 'ng2-file-upload'
import {ConstantService} from './constant.service'
import appAlert from '../../utils/alert'

/**
 * @namespace UploaderService
 * @desc 上传文件
 * @memberOf Services
 */
@Injectable()
export class UploaderService {

  public static MAX_FILE_SIZE = 5 * 1024 * 1024

  constructor() {
  }

  /**
   * @desc 获取FileUploader
   * @return 简易封装的FileUploader
   * @memberOf Services.UploaderService
   */
  public getFileUploader() {
    const token = window.localStorage.getItem('feathers-jwt')
    // B: 初始化定义uploader变量,用来配置input中的uploader属性
    let uploader: FileUploader
    uploader = new FileUploader({
      url: ConstantService.HOST + '/upload', // 上传地址--string
      method: 'POST', // 上传文件的方式--string
      itemAlias: 'uri', // 文件标记、别名--string
      authToken: token, // auth验证的token--string
      authTokenHeader: 'Authorization', // auth验证token的请求头--string
      headers: [{name: 'accept', value: 'application/json'}], // 上传文件的请求头参数--Array<headers>
      removeAfterUpload: true, // 是否在上传完成后从队列中移除--boolean
      maxFileSize: 5 * 1024 * 1024, // 最大可上传文件的大小--number
    })
    uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false
    }
    return uploader
  }

  static formatBytes(bytes, decimals?) {
    if (bytes === 0) { return '0 Bytes'}
    const k = 1024,
      dm = decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  /**
   * @desc 验证文件大小，格式是否正确
   * */
  isValidFile(file) {
    const reg = new RegExp(/\.(jpe?g|png|gif|bmp|svg)$/i)
    const formatMatch = reg.test(file.name)
    const maxSize = UploaderService.MAX_FILE_SIZE
    if (!formatMatch || file.size > maxSize) {
      let message = '', title = ''
      if (!formatMatch) {
        title = `文件${file.name}格式不正确`
        message = '可用图片格式：jpg，jpeg，png，gif，bmp，svg。'
      } else {
        title = `图片${file.name}超过限制大小`
        message = `图片${file.name}，大小${UploaderService.formatBytes(file.size)},
        超过所允许的最大尺寸${UploaderService.formatBytes(maxSize)}`
      }
      console.log('false')
      appAlert.common.confirmWarning(title, message)
      return false
    }
    return true
  }
}
