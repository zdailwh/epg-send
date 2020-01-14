<template>
  <div class="app-container">
    <el-form ref="formSearch" :inline="true" :model="formSearch" class="demo-form-inline">
      <el-form-item label="发送请求ID" prop="request_id">
        <el-input v-model="formSearch.request_id" placeholder="发送请求ID" />
      </el-form-item>
      <el-form-item label="传输流水号" prop="transid">
        <el-input v-model="formSearch.transid" placeholder="传输流水号" />
      </el-form-item>
      <el-form-item label="公共服务平台订单号" prop="orderid">
        <el-input v-model="formSearch.orderid" placeholder="公共服务平台订单号" />
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
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="传输流水号">
        <template slot-scope="scope">
          {{ scope.row.transid }}
        </template>
      </el-table-column>
      <el-table-column label="公共服务平台订单号">
        <template slot-scope="scope">
          {{ scope.row.orderid }}
        </template>
      </el-table-column>
      <el-table-column label="压缩文件名称">
        <template slot-scope="scope">
          {{ scope.row.cmprsname }}
        </template>
      </el-table-column>
      <el-table-column label="提交时间">
        <template slot-scope="scope">
          {{ scope.row.sendtime }}
        </template>
      </el-table-column>
      <el-table-column label="完成时间">
        <template slot-scope="scope">
          {{ scope.row.finishtime }}
        </template>
      </el-table-column>
      <el-table-column label="提交结果">
        <template slot-scope="scope">
          {{ scope.row.resultcode }}
        </template>
      </el-table-column>
      <el-table-column label="提交结果说明">
        <template slot-scope="scope">
          {{ scope.row.resultstr }}
        </template>
      </el-table-column>
      <el-table-column label="发送结果">
        <template slot-scope="scope">
          {{ scope.row.orderstatus }}
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
      <el-table-column type="expand" label="关联项详情" width="56">
        <template slot-scope="scope">
          <p>发送请求：{{ scope.row.request }}</p>
          <p>代理商：{{ scope.row.provider }}</p>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <div class="handler-wrap">
            <el-button v-if="scope.row.status !== 1" type="success" size="mini" @click="doResult(scope.$index, scope.row)">查询发送结果</el-button>
            <router-link :to="'/epg/records/' + scope.row.id + '/results'">
              查看发送结果
            </router-link>
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
import { getRecordsList, providerResult } from '@/api/records'

export default {
  data() {
    return {
      list: null,
      listLoading: false,
      listTotal: 0,
      page: 1,
      per_page: 20,
      formSearch: {
        request_id: '',
        transid: '',
        orderid: '',
        status: '',
        create_time_range: [],
        update_time_range: []
      },
      statusArr: [
        { label: '等待发送', value: 0 },
        { label: '正在发送', value: 1 },
        { label: '发送成功', value: 2 },
        { label: '提交失败', value: 3 },
        { label: '发送失败', value: 4 },
        { label: '发送错误', value: 5 }
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
      if (this.formSearch.request_id !== '') {
        params.request_id = this.formSearch.request_id
      }
      if (this.formSearch.transid !== '') {
        params.transid = this.formSearch.transid
      }
      if (this.formSearch.orderid !== '') {
        params.orderid = this.formSearch.orderid
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
      getRecordsList(params).then(response => {
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
    doResult(index, row) {
      if (this.listLoading) return
      var params = {
        id: row.id
      }
      this.listLoading = true
      providerResult(params).then(response => {
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
