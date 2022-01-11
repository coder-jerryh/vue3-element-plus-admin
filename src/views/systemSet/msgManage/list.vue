<template>
  <div class="serviceDeal">
    <!-- toolBar -->
    <div class="toolbar">
      <e-tree-switch />
      <el-button
        v-code="'000278'"
        :loading="syncLoading"
        icon="el-icon-plus"
        type="primary"
        @click="openPopup"
      >
        添加
      </el-button>
      <e-selecter
        v-model="pages.sendObject"
        class="marginAuto"
        :search-option="sendObjectOption"
        placeholder="选择发送对象"
        @getData="getData"
      />
      <e-selecter
        v-model="pages.type"
        :search-option="searchOption"
        placeholder="选择消息类型"
        @getData="getData"
      />
    </div>
    <!-- 表格 -->
    <el-table v-loading="loading" border :data="tableData" :max-height="$TableHeight">
      <el-table-column type="index" label="序号" width="55" fixed="left" />
      <el-table-column prop="typeName" label="类型" />
      <el-table-column prop="sendObject" label="发送对象">
        <template #default="scope">
          <el-tag v-if="scope.row.sendObject" type="primary">教师</el-tag>
          <el-tag v-else type="success">家长</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="contentStr" label="内容" />
      <el-table-column prop="sendTime" sortable label="发送时间" width="200" />
      <el-table-column label="操作" fixed="right" width="120">
        <template #default="scope">
          <el-button type="text" size="small" @click="readMsg(scope.row)">查看</el-button>
          <el-button
            v-code="'000279'"
            class="danger"
            type="text"
            size="small"
            @click="delMsg(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 页码 -->
    <e-page v-model="pages" :get-data="getData" />
    <!-- 弹窗 -->
    <form-popup ref="formPopup" :form="form" :disabled="disabled" @getData="getData" />
  </div>
</template>

<script>
  import { getMsgListApi, delMsgApi } from '../../../api/systemSet'
  import formPopup from './form.vue'
  import { mapState } from 'vuex'
  import { MST_TYPES } from '../../../const/index'
  import { textFormat } from '../../../utils/filter'

  export default {
    components: { formPopup },
    data() {
      return {
        sendObjectOption: {
          0: '家长',
          1: '教师'
        },
        disabled: false,
        type: '',
        searchOption: [],
        syncLoading: false,
        popupDisabled: false,
        pages: { ...this.$Pages },
        loading: true,
        tableData: [],
        formShow: false,
        bannerShow: false,
        menuShow: false,
        studentTypeShow: false,
        infoShow: false,
        classSetShow: false,
        form: {}
      }
    },
    computed: {
      ...mapState(['schoolInfo', 'refreshFlag'])
    },
    watch: {
      refreshFlag() {
        if (this.activatedFlag) {
          this.getData()
        }
      }
    },
    created() {
      for (const key in MST_TYPES) {
        this.searchOption.push({
          value: key,
          label: MST_TYPES[key]
        })
      }
      if (this.schoolInfo.schoolItemName) {
        this.getData()
      }
    },
    methods: {
      // 获取数据
      getData() {
        if (!this.schoolInfo.schoolItemName) {
          return this.$Toast('warning', '请先选择学校')
        }
        this.loading = true
        const query = this.$FQ({
          ...this.pages,
          schoolNum: this.schoolInfo.schoolNum,
          corpId: this.schoolInfo.corpId
        })
        getMsgListApi(query)
          .then((res) => {
            res.data.forEach((item) => {
              item.patternStr = item.pattern === 1 ? '班级' : '课程'
              item.contentStr = textFormat(item.content)
            })
            this.tableData = res.data
            this.pages.totalNum = res.total
          })
          .finally(() => {
            this.loading = false
          })
      },
      delMsg(item) {
        this.$Confirm('提示', '确认删除该条消息吗？', () => {
          delMsgApi(this.$FQ({ pkId: item.pkId })).then(() => {
            this.getData()
            this.$Toast('success', '已删除')
          })
        })
      },
      // 查看
      readMsg(item) {
        this.form = { ...item }
        this.disabled = true
        this.$refs.formPopup.show = true
      },
      // banner
      openPopup() {
        if (!this.schoolInfo.schoolItemName) {
          return this.$Toast('warning', '请先选择学校')
        }
        this.disabled = false
        this.form = { ...this.schoolInfo, sendAll: 1, recvDingdings: [], sendObject: 0 }
        this.$refs.formPopup.show = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .serviceDeal {
    position: relative;
    flex: 1;
    border-radius: 2px;
    height: 100%;
    background: #fff;
    padding: 12px;
    .marginAuto {
      margin-right: 10px;
    }
  }
</style>
