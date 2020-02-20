<template>
  <el-dialog
    title="创建频道信息"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <div class="dialog-body">
      <el-form ref="formData" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="频道编号" prop="channelid">
          <el-input v-model="formData.channelid" placeholder="频道编号" />
        </el-form-item>
        <el-form-item label="频道名称" prop="channelname">
          <el-input v-model="formData.channelname" placeholder="频道名称" />
        </el-form-item>
        <el-form-item label="提供商" prop="providerId">
          <el-select v-model="formData.providerId" placeholder="提供商">
            <el-option v-for="(item, k) in providers" :key="k" :label="item.name" :value="item.id" />
          </el-select>
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
import { addChannel } from '@/api/channels'
import { getProvidersList } from '@/api/providers'
export default {
  data() {
    return {
      listLoading: false,
      dialogVisible: false,
      formData: {
        channelid: '',
        channelname: '',
        providerId: ''
      },
      rules: {
        channelid: [
          { required: true, message: '请输入频道编号', trigger: 'blur' }
        ],
        channelname: [
          { required: true, message: '请输入频道名称', trigger: 'blur' }
        ],
        providerId: [
          { required: true, message: '请选择提供商', trigger: 'change' }
        ]
      },
      providers: []
    }
  },
  created() {
    this.getProviders()
  },
  methods: {
    onSubmit() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          if (this.listLoading) return
          var params = this.formData
          this.listLoading = true
          addChannel(params).then(response => {
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
    },
    getProviders() {
      if (this.listLoading) return
      var params = {
        page: 0,
        per_page: 20,
        status: 1
      }
      this.listLoading = true
      getProvidersList(params).then(response => {
        this.providers = response.data.items || []
        this.listLoading = false
      }).catch(error => {
        console.log(error)
        this.listLoading = false
      })
    }
  }
}
</script>
