<template>
  <el-dialog
    title="创建用户"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <div class="dialog-body">
      <el-form ref="formData" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请填写用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="请填写密码" />
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请填写手机号码" />
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
import { addUser } from '@/api/users'
export default {
  data() {
    return {
      listLoading: false,
      dialogVisible: false,
      formData: {
        username: '',
        password: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
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
          addUser(params).then(response => {
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
