import Vue from 'vue'
import Preview from './index.vue'

const PreviewConstructor = Vue.extend(Preview)

Preview.install = (picLists = [], current = 0) => {
  const instance = new PreviewConstructor({
    data: {
      picLists,
      current,
      show: true
    }
  }).$mount()
  document.body.appendChild(instance.$el)
}
export default Preview
