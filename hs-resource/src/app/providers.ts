import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar'

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: false
}

const ScrollBarProvider = {
  provide: PERFECT_SCROLLBAR_CONFIG,
  useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
}

export {
  ScrollBarProvider
}
