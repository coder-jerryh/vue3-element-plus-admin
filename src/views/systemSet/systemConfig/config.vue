<template>
  <el-dialog v-model="show" width="50%" title="演示配置">
    <el-form ref="form" label-width="140px">
      <el-form-item label="主键">
        <el-col :span="22">
          <el-input v-model="configForm.pkId" :disabled="configForm.editFlag" />
        </el-col>
      </el-form-item>
      <el-form-item label="学校编号">
        <el-col :span="22">
          <el-input v-model="configForm.schoolNum" />
        </el-col>
      </el-form-item>
      <el-form-item label="corpId">
        <el-col :span="22">
          <el-input v-model="configForm.corpId" />
        </el-col>
      </el-form-item>
      <el-form-item label="班级名称">
        <el-col :span="22">
          <el-input v-model="configForm.className" />
        </el-col>
      </el-form-item>
      <el-form-item label="班级编号">
        <el-col :span="22">
          <el-input v-model="configForm.classNum" />
        </el-col>
      </el-form-item>
      <el-form-item label="学生姓名">
        <el-col :span="22">
          <el-input v-model="configForm.userName" />
        </el-col>
      </el-form-item>
      <el-form-item label="学生编号">
        <el-col :span="22">
          <el-input v-model="configForm.studentNum" />
        </el-col>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-col :span="22">
          <el-input v-model="configForm.studentNo" />
        </el-col>
      </el-form-item>
      <el-form-item label="家长编号">
        <el-col :span="22">
          <el-input v-model="configForm.dingUserId" />
        </el-col>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-col :span="22">
          <el-input v-model="configForm.mobile" maxlength="11" />
        </el-col>
      </el-form-item>
      <el-form-item label="数据同步">
        <el-col :span="22">
          <el-radio-group v-model="configForm.open">
            <el-radio :label="true" :value="true">开启</el-radio>
            <el-radio :label="false" :value="false">关闭</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="学校钉钉agentId">
        <el-col :span="22">
          <el-input v-model="configForm.agentId" />
        </el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="show = false">取消</el-button>
      <el-button type="primary" @click="submit">
        {{ configForm.editFlag ? '修改' : '添加' }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { insertOrderUpdateApi } from '../../../api/systemSet'

  export default {
    components: {},
    props: {
      value: Boolean,
      form: Object
    },
    emits: ['getData'],
    data() {
      return {
        show: false,
        loading: true,
        configForm: {}
      }
    },
    watch: {
      show() {
        if (this.show) {
          this.configForm = { ...this.form }
        }
      }
    },
    methods: {
      submit() {
        this.configForm.open = this.configForm.open ? 1 : 0
        insertOrderUpdateApi(this.configForm).then((data) => {
          this.show = false
          this.$emit('getData')
          this.$Toast('success', data.msg)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-form {
    padding: 0 !important;
  }
</style>
