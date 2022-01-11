import ElementPlus from 'element-plus'
import '../assets/css/dialog.scss'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import { App } from 'vue'
export const setupElementUI = (app: App) => {
  app.use(ElementPlus, { size: 'medium', locale: locale })
  const elementPlus: any = app._context.components
  const TableProps = elementPlus.ElTable.props
  const TableColumnProps = elementPlus.ElTableColumn.props
  const DialogProps = elementPlus.ElDialog.props
  // ---------- 全局表格设置 ----------
  // 边框线
  TableProps.border = { type: Boolean, default: true }
  // 居中
  TableProps.maxHeight = { type: [String, Number], default: '575px' }
  // 居中
  TableColumnProps.align = { type: String, default: 'center' }
  // 最小宽度
  TableColumnProps.minWidth = { type: [String, Number], default: '120' }
  // 文本溢出
  TableColumnProps.showOverflowTooltip = { type: Boolean, default: true }
  // ---------- 全局弹窗设置 ----------
  // 弹窗宽度
  DialogProps.width = { type: [String, Number], default: '40%' }
  // 居中
  DialogProps.center = { type: Boolean, default: true }
  // 点击蒙版不关闭
  DialogProps.closeOnClickModal = { type: Boolean, default: false }
  // 关闭销毁
  DialogProps.destroyOnClose = { type: Boolean, default: true }
}
