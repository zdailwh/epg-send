<template>
  <el-dialog
    title="创建数据提供机构"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <div class="dialog-body">
      <el-form ref="formData" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="机构简称" prop="abbrname">
          <el-input v-model="formData.abbrname" placeholder="包含字母、数字或下划线，如ttfa_01" />
        </el-form-item>
        <el-form-item label="机构代码" prop="code">
          <el-input v-model="formData.code" placeholder="18位，为数据提供方的统一社会信用代码" />
        </el-form-item>
        <el-form-item label="AppKey" prop="appkey">
          <el-input v-model="formData.appkey" placeholder="由EPG公共服务平台分配" />
        </el-form-item>
        <el-form-item label="AppSecret" prop="appsecret">
          <el-input v-model="formData.appsecret" placeholder="由EPG公共服务平台分配" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">创 建</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addProvider } from '@/api/providers'
export default {
  data() {
    return {
      listLoading: false,
      dialogVisible: false,
      formData: {
        abbrname: '',
        code: '',
        appkey: '',
        appsecret: ''
      },
      rules: {
        abbrname: [
          { required: true, message: '请输入机构简称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入机构代码', trigger: 'blur' }
        ],
        appkey: [
          { required: true, message: '请输入AppKey', trigger: 'blur' }
        ],
        appsecret: [
          { required: true, message: '请输入AppSecret', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          if (this.listLoading) return
          var params = this.formData
          this.listLoading = true
          addProvider(params).then(response => {
            this.dialogVisible = false
            this.listLoading = false
            this.$emit('getlist')
            this.$message({
              message: '创建成功！',
              type: 'success'
            })
          }).catch(error => {
            console.log(error)
            this.listLoading = false
          })
        }
      })
    },
    handleClose() {
      this.$refs.formData.resetFields()
      this.dialogVisible = false
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    }
  }
}
</script>
