<template>
  <div class="app-container">
    <el-form ref="formSearch" :inline="true" :model="formSearch" class="demo-form-inline">
      <el-form-item label="频道编号" prop="channelid">
        <el-input v-model="formSearch.channelid" placeholder="频道编号" />
      </el-form-item>
      <el-form-item label="频道名称" prop="channelname">
        <el-input v-model="formSearch.channelname" placeholder="频道名称" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="formSearch.status" placeholder="状态">
          <el-option v-for="(item, k) in statusArr" :key="k" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间范围" prop="create_time_range">
        <el-date-picker
          v-model="formSearch.create_time_range"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="更新时间范围" prop="update_time_range">
        <el-date-picker
          v-model="formSearch.update_time_range"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button @click="resetForm('formSearch')">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="createWrap">
      <el-button type="primary" icon="el-icon-plus" @click="$refs.add.dialogVisible = true">创建频道信息</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
      size="small"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="频道编号">
        <template slot-scope="scope">
          {{ scope.row.channelid }}
        </template>
      </el-table-column>
      <el-table-column label="频道名称">
        <template slot-scope="scope">
          {{ scope.row.channelname }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.statusstr }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template slot-scope="scope">
          {{ scope.row.update_time }}
        </template>
      </el-table-column>
      <el-table-column type="expand" label="关联项详情" width="56">
        <template slot-scope="scope">
          <p>提供商：{{ scope.row.provider }}</p>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" align="center">
        <template slot-scope="scope">
          <div class="handler-wrap">
            <el-button v-if="scope.row.status !== 1" type="success" size="mini" @click="doValid(scope.$index, scope.row)">激活</el-button>
            <el-button v-if="scope.row.status !== 0" type="danger" size="mini" @click="doInvalid(scope.$index, scope.row)">冻结</el-button>
            <el-button size="mini" @click="edititem = scope.row;$refs.update.dialogVisible = true">编辑</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pageContainer">
      <el-pagination
        :total="listTotal"
        layout="total, prev, pager, next"
        :current-page.sync="page"
        background
        :page-size="per_page"
        @size-change="fetchData"
        @current-change="fetchData"
      />
    </div>
    <Additem ref="add" @getlist="fetchData" />
    <Updateitem ref="update" :editdata="edititem" @getlist="fetchData" />
  </div>
</template>

<script>
import { getChannelsList, channelValid, channelInvalid } from '@/api/channels'
import Additem from './Addchannel'
import Updateitem from './Updatechannel'

export default {
  components: { Additem, Updateitem },
  data() {
    return {
      list: null,
      listLoading: false,
      listTotal: 0,
      page: 1,
      per_page: 20,
      formSearch: {
        channelid: '',
        channelname: '',
        status: '',
        create_time_range: [],
        update_time_range: []
      },
      statusArr: [
        { label: '无效', value: 0 },
        { label: '有效', value: 1 }
      ],
      edititem: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      if (this.listLoading) return
      var params = {
        page: this.page - 1,
        per_page: this.per_page
      }
      if (this.formSearch.channelid !== '') {
        params.channelid = this.formSearch.channelid
      }
      if (this.formSearch.channelname !== '') {
        params.channelname = this.formSearch.channelname
      }
      if (this.formSearch.status !== '') {
        params.status = this.formSearch.status
      }
      if (this.formSearch.create_time_range.length) {
        params.create_time_range = this.formSearch.create_time_range
      }
      if (this.formSearch.update_time_range.length) {
        params.update_time_range = this.formSearch.update_time_range
      }
      this.listLoading = true
      getChannelsList(params).then(response => {
        this.list = response.data.items || []
        this.listTotal = response.data.total || 0
        this.listLoading = false
      }).catch(error => {
        console.log(error)
        this.listLoading = false
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    doValid(index, row) {
      if (this.listLoading) return
      var params = {
        id: row.id
      }
      this.listLoading = true
      channelValid(params).then(response => {
        this.list[index] = response.data
        this.$message({
          message: '激活成功！',
          type: 'success'
        })
        this.listLoading = false
      }).catch(error => {
        console.log(error)
        this.listLoading = false
      })
    },
    doInvalid(index, row) {
      if (this.listLoading) return
      var params = {
        id: row.id
      }
      this.listLoading = true
      channelInvalid(params).then(response => {
        this.list[index] = response.data
        this.$message({
          message: '冻结成功！',
          type: 'success'
        })
        this.listLoading = false
      }).catch(error => {
        console.log(error)
        this.listLoading = false
      })
    }
  }
}
</script>
<style scoped>
.pageContainer {
  margin: 15px 0;
}
.demo-form-inline {
  padding: 20px 15px 0;
  background-color: #f2f2f2;
}
.handler-wrap .el-button {
  margin-bottom: 5px;
}
</style>
