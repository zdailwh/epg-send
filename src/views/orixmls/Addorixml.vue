<template>
  <el-dialog
    title="创建原文件"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <div class="dialog-body">
      <el-form ref="formData" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="原文件名称" prop="name">
          <el-input v-model="formData.name" placeholder="请填写原文件名称" />
        </el-form-item>
        <el-form-item label="原文件路径" prop="xmlpath">
          <el-input v-model="formData.xmlpath" placeholder="请填写原文件路径" />
        </el-form-item>
        <el-form-item label="系统创建时间" prop="xmlcreatetime">
          <el-date-picker v-model="formData.xmlcreatetime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择原文件系统创建时间" />
        </el-form-item>
        <el-form-item label="文件大小" prop="fliesize">
          <el-input v-model="formData.fliesize" placeholder="请填写文件大小" />
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
import { addOrixml } from '@/api/orixmls'
export default {
  data() {
    return {
      listLoading: false,
      dialogVisible: false,
      formData: {
        name: '',
        xmlpath: '',
        xmlcreatetime: '',
        fliesize: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入原文件名称', trigger: 'blur' }
        ],
        xmlpath: [
          { required: true, message: '请输入原文件路径', trigger: 'blur' }
        ],
        xmlcreatetime: [
          { required: true, message: '请输入原文件系统创建时间', trigger: 'change' }
        ],
        fliesize: [
          { required: true, message: '请输入文件大小', trigger: 'blur' }
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
          addOrixml(params).then(response => {
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
