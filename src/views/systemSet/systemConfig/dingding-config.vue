<template>
  <el-dialog v-model="show" width="50%" title="钉钉转发配置">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px">
      <el-form-item label="组织名称" prop="orgName">
        <el-col :span="22">
          <el-input v-model="configForm.orgName" />
        </el-col>
      </el-form-item>
      <el-form-item label="钉钉组织编号" prop="corpId">
        <el-col :span="22">
          <el-input v-model="configForm.corpId" :disabled="configForm.pkId ? true : false">
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="转发网关地址" prop="gatewayAddr">
        <el-col :span="22">
          <el-input v-model="configForm.gatewayAddr"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="备注">
        <el-col :span="22">
          <el-input v-model="configForm.remark" type="textarea" rows="2"> </el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="show = false">取消</el-button>
      <el-button type="primary" @click="submit">{{ configForm.pkId ? '修改' : '添加' }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { saveDingOrUpdateApi } from '../../../api/systemSet'

  export default {
    props: {
      form: Object
    },
    emits: ['getData'],
    data() {
      return {
        configForm: {},
        show: false,
        loading: true,
        rules: {
          orgName: [{ required: true, message: '请输入组织名称', trigger: 'blur' }],
          corpId: [{ required: true, message: '请输入钉钉组织编号', trigger: 'blur' }],
          gatewayAddr: [{ required: true, message: '请输入转发网关地址', trigger: 'blur' }]
        }
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
        saveDingOrUpdateApi(this.configForm).then((data) => {
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
