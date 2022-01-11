<template>
  <el-dialog v-if="show" v-model="show" width="55%" :title="`${form.pkId ? '查看' : '新建'}消息`">
    <el-carousel ref="carsouel" :autoplay="false" height="100%">
      <el-carousel-item>
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
          <el-form-item label="消息类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择" :disabled="disabled">
              <el-option
                v-for="(val, key) in MST_TYPES"
                :key="key"
                :label="val"
                :value="key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发送对象" prop="sendObject">
            <el-radio-group
              v-model="form.sendObject"
              :disabled="disabled"
              @change="clearCheckedData"
            >
              <el-radio :label="0" :value="0">家长</el-radio>
              <el-radio :label="1" :value="1">老师</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发送至" prop="sendAll">
            <el-radio-group v-model="form.sendAll" :disabled="disabled" @change="clearCheckedData">
              <el-radio :label="1" :value="1">所有人</el-radio>
              <el-radio :label="2" :value="2">部分人</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="form.sendAll == 2" label="人员选择" prop="recvDingdings">
            <el-button v-if="disabled" type="success" @click="selectParent">
              查看接收人员
            </el-button>
            <el-button v-else type="success" @click="selectParent">
              {{
                form.recvDingdings && form.recvDingdings.length
                  ? `已选择${form.recvDingdings.length}位接收人员`
                  : '选择人员'
              }}
            </el-button>
          </el-form-item>
          <el-form-item label="消息内容" prop="content">
            <!-- <e-editor v-model="form.content" id-name="msgManageContent" :disabled="disabled" /> -->
          </el-form-item>
        </el-form>
        <div class="dialog-footer btns">
          <el-button @click="show = false">{{ disabled ? '关闭' : '取消' }}</el-button>
          <el-button v-if="!disabled" type="primary" :loading="btnLoading" @click="submit">
            提交
          </el-button>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <!-- toolBar -->
        <div v-if="disabled" class="toolbar">
          <el-button type="primary" @click="$refs.carsouel.setActiveItem(0)">返回</el-button>
        </div>
        <div v-else class="toolbar">
          <el-button type="success" @click="saveParent">确认</el-button>
          <!-- <el-button type="primary" @click="$refs.carsouel.setActiveItem(0)">返回</el-button> -->
          <e-seacher
            v-if="form.sendObject"
            v-model="pages.teacherName"
            class="marginAuto"
            placeholder="输入教师姓名搜索"
            @getData="getData"
          />
          <e-seacher
            v-else
            v-model="pages.alias"
            class="marginAuto"
            placeholder="输入家长别名搜索"
            @getData="getData"
          />
        </div>
        <!-- 表格 -->
        <el-table
          ref="table"
          v-loading="loading"
          :row-key="getRowKey"
          border
          :data="tableData"
          fixed
          height="70vh"
          @selection-change="handleSelectionChange"
        >
          <el-table-column v-if="!disabled" type="selection" width="55" reserve-selection />
          <el-table-column type="index" label="序号" width="55" />
          <el-table-column v-if="form.sendObject" prop="teacherName" label="教师名称" />
          <el-table-column v-else prop="alias" label="家长别名" />
        </el-table>
        <!-- 页码 -->
        <e-page v-model="pages" :get-data="getData" />
      </el-carousel-item>
    </el-carousel>
  </el-dialog>
</template>

<script>
  import { addMsgApi } from '../../../api/systemSet'
  import {
    getParentInfoListApi,
    getMsgReciverApi,
    getTeacherInfoListApi
  } from '../../../api/schoolManage'
  // import eEditor from '../../../components/eEditor.vue'
  import { MST_TYPES } from '../../../const/index'
  import { textFormat } from '../../../utils/filter'

  export default {
    components: {
      // eEditor
    },
    props: {
      disabled: Boolean,
      form: Object
    },
    emits: ['getData'],
    data() {
      return {
        btnLoading: false,
        recvDingdings: [],
        pages: { ...this.$Pages, size: 20 },
        MST_TYPES,
        show: false,
        loading: true,
        tableData: [],
        activeName: '1',
        rules: {
          title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
          type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
          sendObject: [{ required: true, message: '请选择发送对象', trigger: 'blur' }],
          sendAll: [{ required: true, message: '请选择发送人员', trigger: 'blur' }],
          recvDingdings: [{ required: true, message: '请选择发送人员', trigger: 'blur' }],
          content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
        }
      }
    },
    watch: {
      show() {
        if (this.show) {
          this.pages = { ...this.$Pages, size: 20 }
        } else {
          this.tableData = []
        }
      }
    },
    methods: {
      selectParent() {
        this.$refs.carsouel.setActiveItem(1)
        this.pages = { ...this.$Pages, size: 20 }
        this.getData()
      },
      saveParent() {
        // if (!this.form.recvDingdings.length) {
        //   return this.$Toast('warning', '请选择人员')
        // }
        this.pages.current = 1
        this.$refs.carsouel.setActiveItem(0)
      },
      getRowKey(row) {
        // 1教师、0家长
        return this.form.sendObject ? row.pkId : row.studentNumDingding
      },
      getData() {
        this.loading = true
        const query = this.$FQ({ ...this.pages, pkId: this.form.pkId, corpId: this.form.corpId })
        // 查看
        if (this.disabled) {
          getMsgReciverApi(query)
            .then((res) => {
              this.tableData = res.data.map((item) => {
                // 0家长、1教师
                if (this.form.sendObject) {
                  return { ...item, teacherName: item.name }
                } else {
                  return { ...item, teacherName: item.alias }
                }
              })
              this.pages.totalNum = res.total
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          const handleData = (res) => {
            this.tableData = res.data.map((item) => {
              // 0家长、1教师
              // 创造唯一标示
              if (!this.form.sendObject) {
                return { ...item, studentNumDingding: item.studentNum + item.dingding }
              } else {
                return { ...item }
              }
            })
            this.pages.totalNum = res.total
          }
          // 教师
          if (this.form.sendObject) {
            getTeacherInfoListApi(query)
              .then((res) => {
                handleData(res)
              })
              .finally(() => {
                this.loading = false
              })
          } else {
            // 家长
            getParentInfoListApi(query)
              .then((res) => {
                handleData(res)
              })
              .finally(() => {
                this.loading = false
              })
          }
        }
      },
      clearCheckedData() {
        this.form.recvDingdings = []
        this.$refs.table.clearSelection()
      },
      // val表示选中的表格行数据
      handleSelectionChange(val) {
        this.form.recvDingdings = val.map((item) => item.dingding || item.teacherNum)
      },
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.btnLoading = true
            let form = { ...this.form, recvDingdings: this.form.recvDingdings.join() }
            var pics = []
            form.content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
              pics.push(capture)
            })
            // 系统消息
            if (Number(this.form.type) === 1) {
              form = {
                ...form,
                title: '系统消息',
                text: textFormat(form.content),
                pics: pics.join()
              }
            }
            addMsgApi(form)
              .then(() => {
                this.$emit('getData')
                this.show = false
                this.$Toast('success', '添加成功！')
              })
              .finally(() => {
                this.btnLoading = false
              })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped></style>
