<template>
  <el-dialog
    title="编辑频道信息"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <div class="dialog-body">
      <el-form ref="formData" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="频道编号" prop="channelid">
          <el-input v-model="formData.channelid" placeholder="请填写频道编号" />
        </el-form-item>
        <el-form-item label="频道名称" prop="channelname">
          <el-input v-model="formData.channelname" placeholder="请填写频道名称" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">提 交</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { updateChannel } from '@/api/channels'
export default {
  props: {
    editdata: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      listLoading: false,
      dialogVisible: false,
      formData: {
        channelid: '',
        channelname: ''
      },
      rules: {
        channelid: [
          { required: true, message: '请输入频道编号', trigger: 'blur' }
        ],
        channelname: [
          { required: true, message: '请输入频道名称', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    editdata(val) {
      this.formData.id = val.id
      this.formData.channelid = val.channelid
      this.formData.channelname = val.channelname
    }
  },
  methods: {
    onSubmit() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          if (this.listLoading) return
          var params = this.formData
          console.log(params)
          this.listLoading = true
          updateChannel(params).then(response => {
            this.dialogVisible = false
            this.listLoading = false
            this.$emit('getlist')
            this.$message({
              message: '修改成功！',
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
