<template>
  <div class="app-container">
    <el-form ref="formSearch" :inline="true" :model="formSearch" class="demo-form-inline">
      <el-form-item label="频道名称" prop="channelname">
        <el-input v-model="formSearch.channelname" placeholder="频道名称" />
      </el-form-item>
      <el-form-item label="重试次数" prop="retry">
        <el-input v-model="formSearch.retry" placeholder="重试次数" />
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

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
      size="small"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <p>原文件：{{ scope.row.orixml }}</p>
          <p>发送记录：{{ scope.row.record }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="频道ID">
        <template slot-scope="scope">
          {{ scope.row.channelid }}
        </template>
      </el-table-column>
      <el-table-column label="频道名称">
        <template slot-scope="scope">
          {{ scope.row.channelname }}
        </template>
      </el-table-column>
      <el-table-column label="文件名称">
        <template slot-scope="scope">
          {{ scope.row.filename }}
        </template>
      </el-table-column>
      <el-table-column label="文件路径">
        <template slot-scope="scope">
          {{ scope.row.realpath }}
        </template>
      </el-table-column>
      <el-table-column label="文件扩展名">
        <template slot-scope="scope">
          {{ scope.row.ext }}
        </template>
      </el-table-column>
      <el-table-column label="文件大小">
        <template slot-scope="scope">
          {{ scope.row.filesize }}
        </template>
      </el-table-column>
      <el-table-column label="文件md5值">
        <template slot-scope="scope">
          {{ scope.row.filemd5 }}
        </template>
      </el-table-column>
      <el-table-column label="压缩文件名称">
        <template slot-scope="scope">
          {{ scope.row.cmprsname }}
        </template>
      </el-table-column>
      <el-table-column label="压缩文件路径">
        <template slot-scope="scope">
          {{ scope.row.cmprspath }}
        </template>
      </el-table-column>
      <el-table-column label="压缩文件扩展名">
        <template slot-scope="scope">
          {{ scope.row.cmprsext }}
        </template>
      </el-table-column>
      <el-table-column label="压缩文件大小">
        <template slot-scope="scope">
          {{ scope.row.cmpresize }}
        </template>
      </el-table-column>
      <el-table-column label="完成时间">
        <template slot-scope="scope">
          {{ scope.row.finishtime }}
        </template>
      </el-table-column>
      <el-table-column label="重试次数">
        <template slot-scope="scope">
          {{ scope.row.retry }}
        </template>
      </el-table-column>
      <el-table-column label="日志">
        <template slot-scope="scope">
          {{ scope.row.log }}
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
      <el-table-column class-name="status-col" label="操作" width="110" align="center">
        <template slot-scope="scope">
          <div class="handler-wrap">
            <el-button v-if="scope.row.status !== 1" type="success" size="mini" @click="doManualretry(scope.$index, scope.row)">手动重试发送</el-button>
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
  </div>
</template>

<script>
import { getSplitxmlsList, splitxmlManualretry } from '@/api/splitxmls'

export default {
  data() {
    return {
      list: null,
      listLoading: false,
      listTotal: 0,
      page: 1,
      per_page: 20,
      formSearch: {
        channelname: '',
        retry: '',
        status: '',
        create_time_range: [],
        update_time_range: []
      },
      statusArr: [
        { label: '等待发送', value: 0 },
        { label: '正在发送', value: 1 },
        { label: '发送成功', value: 2 },
        { label: '发送失败', value: 4 }
      ]
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
      if (this.formSearch.channelname !== '') {
        params.channelname = this.formSearch.channelname
      }
      if (this.formSearch.retry !== '') {
        params.retry = this.formSearch.retry
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
      getSplitxmlsList(params).then(response => {
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
    doManualretry(index, row) {
      if (this.listLoading) return
      var params = {
        id: row.id
      }
      this.listLoading = true
      splitxmlManualretry(params).then(response => {
        this.list[index] = response.data
        this.$message({
          message: '执行成功！',
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
