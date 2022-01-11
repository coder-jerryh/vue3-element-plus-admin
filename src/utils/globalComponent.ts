import { App } from 'vue'
// import VueAMap from 'vue-amap'
import eSelecterWithPage from '../components/form-components/e-selecter-with-page.vue'
import eDateSelecter from '../components/form-components/e-date-selecter.vue'
import eEmptyLayout from '../components/display-components/e-empty-layout.vue'
import ElButton from '../components/elemenu-ui/ElButton.vue'
import ElInput from '../components/elemenu-ui/ElInput.vue'
// import eUpload from '../components/upload-components/e-upload.vue'
import ePage from '../components/display-components/e-page.vue'
import eRadio from '../components/form-components/e-radio.vue'
// import eMarkdown from '../components/form-components/e-markdown.vue'
import eSeacher from '../components/form-components/e-seacher.vue'
import eSelecter from '../components/form-components/e-selecter.vue'
// import eSelectPage from '../components/form-components/e-select-page.vue'
import eTreeSwitch from '../components/display-components/e-tree-switch.vue'
import eFilterPanel from '../components/popup-components/e-filter-panel/index.vue'
export const setupGlobalComponent = (app: App) => {
  app.component('ElButton', ElButton)
  app.component('ElInput', ElInput)
  app.component('ESelecterWithPage', eSelecterWithPage)
  app.component('EPage', ePage)
  app.component('ESeacher', eSeacher)
  app.component('ESelecter', eSelecter)
  app.component('ERadio', eRadio)
  // app.component('EMarkdown', eMarkdown)
  // app.component('EUpload', eUpload)
  app.component('EDateSelecter', eDateSelecter)
  app.component('ETreeSwitch', eTreeSwitch)
  app.component('EFilterPanel', eFilterPanel)
  app.component('EEmptyLayout', eEmptyLayout)
  // // 地图
  // Vue.use(VueAMap)
  // VueAMap.initAMapApiLoader({
  //   key: '9fde4b8bed683fef9716a1f81ebe95c4',
  //   plugin: [
  //     'AMap.Autocomplete',
  //     'AMap.PlaceSearch',
  //     'AMap.Scale',
  //     'AMap.OverView',
  //     'AMap.ToolBar',
  //     'AMap.MapType',
  //     'AMap.PolyEditor',
  //     'AMap.CircleEditor'
  //   ],
  //   // 默认高德 sdk 版本为 1.4.4
  //   v: '1.4.4'
  // })
}
