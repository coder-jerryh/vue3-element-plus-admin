<template>
  <div class="systemConfig">
    <el-tabs v-model="activeType" type="border-card" @tab-click="changeType">
      <el-tab-pane label="系统配置" name="system" />
      <el-tab-pane label="演示配置" name="demo" />
      <el-tab-pane label="钉钉转发配置" name="dingding" />
    </el-tabs>
    <!-- 演示配置 -->
    <div v-show="activeType == 'demo'" class="wrap">
      <div class="toolbar">
        <el-button icon="el-icon-plus" type="primary" @click="addDemo">添加</el-button>
      </div>
      <el-table v-loading="loading" border :data="tableData" :max-height="$TableHeight">
        <el-table-column type="index" label="序号" width="55" fixed="left" />
        <el-table-column prop="pkId" label="主键" />
        <el-table-column prop="schoolNum" label="学校编号" min-width="130" />
        <el-table-column prop="corpId" label="corpId" min-width="130" />
        <el-table-column prop="classNum" label="班级编号" min-width="130" />
        <el-table-column prop="className" label="班级名称" min-width="150" />
        <el-table-column prop="studentNum" label="学生编号" min-width="150" />
        <el-table-column prop="userName" label="学生姓名" />
        <el-table-column prop="dingUserId" label="家长编号" />
        <el-table-column prop="mobile" label="电话号码" />
        <el-table-column prop="studentNo" label="身份证号" min-width="150" />
        <el-table-column prop="agentId" label="学校钉钉agentId" min-width="150" />
        <!-- <el-table-column prop="open" label="数据同步开关" width="180" min-width='150'>
          <template slot-scope="scope">
            <el-switch @change='changeOpen($event, scope.row)' v-model='scope.row.open' :active-text="scope.row.open ? '开启' : '关闭'"></el-switch>
          </template>
        </el-table-column> -->
        <el-table-column prop="open" label="数据同步">
          <template #default="scope">
            <el-tag v-if="scope.row.open" type="success">开启</el-tag>
            <el-tag v-else type="info">关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="90">
          <template #default="scope">
            <el-button v-code="'000277'" type="text" size="small" @click="editDemo(scope.row)">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 钉钉配置 -->
    <div v-show="activeType == 'dingding'" class="wrap">
      <div class="toolbar">
        <el-button icon="el-icon-plus" type="primary" @click="addDingdingConfig">添加</el-button>
        <e-seacher
          v-model="pages.orgName"
          class="marginAuto"
          style="margin-right: 10px"
          placeholder="输入组织名称搜索"
          @getData="getDingdingConfigList"
        />
        <e-filter-panel
          v-model="pages"
          :exclude-keys="['orgName']"
          @getData="getDingdingConfigList"
        >
          <e-seacher
            v-model="pages.gatewayAddr"
            placeholder="输入转发网关地址搜索"
            title="请输入转发网关地址搜索"
            @getData="getDingdingConfigList"
          />
          <e-seacher
            v-model="pages.corpId"
            placeholder="输入钉钉组织编号搜索"
            title="请输入钉钉组织编号搜索"
            @getData="getDingdingConfigList"
          />
        </e-filter-panel>
      </div>
      <el-table v-loading="loading" border :data="tableData" :max-height="$TableHeight">
        <el-table-column type="index" label="序号" width="55" fixed="left" />
        <el-table-column prop="orgName" label="组织名称" min-width="130" />
        <el-table-column prop="gatewayAddr" label="转发网关地址" min-width="130" />
        <el-table-column prop="corpId" label="钉钉组织编号" />
        <el-table-column prop="remark" label="备注" min-width="150" />
        <el-table-column label="操作" fixed="right" width="90">
          <template #default="scope">
            <el-button
              v-code="'000277'"
              type="text"
              size="small"
              @click="editDingConfig(scope.row)"
            >
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <e-page v-model="pages" :get-data="getDingdingConfigList" />
    </div>
    <!-- 系统配置 -->
    <el-form
      v-show="activeType == 'system'"
      ref="form"
      v-loading="loading"
      class="systemConfigForm"
      label-width="200px"
    >
      <el-form-item v-for="(item, i) in sysConfigList" :key="i" :label="item.name">
        <el-col :span="22">
          <el-input v-model="item.parameter" :placeholder="`请输入${item.remark}`">
            <template #append>{{ item.remark }}</template>
          </el-input>
          <!-- 小程序版本提示 -->
          <el-input
            v-if="item.name == 'version'"
            v-model="item.tips"
            type="textarea"
            rows="3"
            placeholder="请输入小程序版本提示"
          />
        </el-col>
      </el-form-item>
    </el-form>
    <div v-show="activeType == 'system'" class="btns">
      <el-button
        v-code="'000277'"
        type="primary"
        :disabled="disabled"
        :loading="subLoading"
        @click="submit"
      >
        保存
      </el-button>
    </div>
    <config-popup ref="configPopup" :form="demoForm" @getData="getDemoConfigList" />
    <dingding-config-popup
      ref="dingdingConfigPopup"
      :form="dingdingdForm"
      @getData="getDingdingConfigList"
    />
  </div>
</template>

<script>
  import {
    saveSystemConfigApi,
    getAllSystemConfigApi,
    getDemoConfigListApi,
    updateIsOpenApi,
    getDingdingConfigListApi
  } from '../../../api/systemSet'
  import configPopup from './config.vue'
  import dingdingConfigPopup from './dingding-config.vue'
  import { mapState } from 'vuex'

  export default {
    components: {
      configPopup,
      dingdingConfigPopup
    },
    data() {
      return {
        dingdingdForm: {},
        loading: true,
        tableData: [],
        activeType: 'system',
        sysConfigList: [],
        form: {},
        demoForm: {},
        show: false,
        subLoading: false,
        pages: { ...this.$Pages }
      }
    },
    computed: {
      ...mapState(['refreshFlag']),
      disabled() {
        return Boolean(!this.sysConfigList.length)
      }
    },
    watch: {
      refreshFlag() {
        if (this.activatedFlag) {
          this.changeType()
        }
      }
    },
    created() {
      this.changeType()
    },
    methods: {
      changeType() {
        if (this.activeType === 'demo') {
          this.getDemoConfigList()
        } else if (this.activeType === 'dingding') {
          this.getDingdingConfigList()
        } else {
          this.getAllSystemConfig()
        }
      },
      getDemoConfigList() {
        this.loading = true
        getDemoConfigListApi()
          .then((res) => {
            this.tableData = res.data
          })
          .finally(() => {
            this.loading = false
          })
      },
      getDingdingConfigList() {
        this.loading = true
        getDingdingConfigListApi(this.$FQ(this.pages))
          .then((res) => {
            this.tableData = res.data
            this.pages.totalNum = res.total
          })
          .finally(() => {
            this.loading = false
          })
      },
      getAllSystemConfig() {
        this.loading = true
        getAllSystemConfigApi()
          .then(({ data }) => {
            this.sysConfigList = data
          })
          .finally(() => {
            this.loading = false
          })
      },
      changeOpen() {
        updateIsOpenApi().then(() => {})
      },
      addDemo() {
        this.demoForm = {}
        this.$refs.configPopup.show = true
      },
      editDemo(item) {
        this.demoForm = { ...item, editFlag: true }
        this.$refs.configPopup.show = true
      },
      submit() {
        this.subLoading = true
        saveSystemConfigApi(this.sysConfigList)
          .then(() => {
            this.$Toast('success', '保存成功！')
          })
          .finally(() => {
            this.subLoading = false
          })
      },
      // 钉钉配置
      addDingdingConfig() {
        this.dingdingdForm = {}
        this.$refs.dingdingConfigPopup.show = true
      },
      editDingConfig(item) {
        this.dingdingdForm = { ...item }
        this.$refs.dingdingConfigPopup.show = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .systemConfig {
    flex: 1;
    border-radius: 2px;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    .wrap {
      position: relative;
      flex: 1;
      border-radius: 2px;
      padding: 12px;
      background: #fff;
    }
    ::v-deep(.el-tabs) {
      box-shadow: 0 -10px 10px rgba(0, 0, 0, 0.02);
      border-radius: 2px;
      overflow: hidden;
      border: 0;
      .el-tabs__content {
        height: 0;
        padding: 0;
      }
    }
    ::v-deep(.systemConfigForm) {
      padding: 30px 30px 10px;
      flex: 1;
      overflow: auto;
      .el-input__inner {
        border-radius: 4px;
      }
      .el-input-group__append {
        width: 272px;
        padding: 0 12px;
        background: #fff;
        border: 0;
      }
      .el-textarea {
        margin-top: 20px;
        width: calc(100% - 272px);
        position: relative;
        &::after {
          transform: translate(100%, -50%);
          position: absolute;
          top: 50%;
          right: 0;
          content: '小程序版本提示';
          color: #909399;
          padding: 0 12px;
        }
        &::before {
          transform: translate(-100%, -50%);
          position: absolute;
          top: 12px;
          left: 0;
          content: 'Mini Program Tips';
          color: #606266;
          padding: 0 12px;
        }
      }
    }
    .btns {
      border-top: 1px solid #e1e1e1;
      height: 80px;
      line-height: 80px;
      text-align: center;
      .el-button {
        width: 200px;
      }
    }
  }
</style>
