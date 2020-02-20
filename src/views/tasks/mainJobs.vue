<template>
  <div class="app-container">
    <el-form ref="formSearch" :inline="true" :model="formSearch" class="demo-form-inline">
      <el-form-item label="目标ID" prop="target_id">
        <el-input v-model="formSearch.target_id" placeholder="目标ID" />
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
      element-loading-text="加载中"
      fit
      highlight-current-row
      size="small"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="目标方法">
        <template slot-scope="scope">
          {{ scope.row.jobmethod }}
        </template>
      </el-table-column>
      <el-table-column label="调度时间">
        <template slot-scope="scope">
          {{ scope.row.schedule }}
        </template>
      </el-table-column>
      <el-table-column label="调度开始时间">
        <template slot-scope="scope">
          {{ scope.row.scheduletime }}
        </template>
      </el-table-column>
      <el-table-column label="任务持续时间MS">
        <template slot-scope="scope">
          {{ scope.row.duration }}
        </template>
      </el-table-column>
      <el-table-column label="运行日志">
        <template slot-scope="scope">
          {{ scope.row.log }}
        </template>
      </el-table-column>
      <el-table-column label="运行标识">
        <template slot-scope="scope">
          {{ scope.row.flag }}
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
          <p>线程：{{ scope.row.thread }}</p>
          <p>目标：{{ scope.row.target }}</p>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" align="center">
        <template slot-scope="scope">
          <div class="handler-wrap">
            <el-button v-if="scope.row.status === 0" size="mini" @click="mainJobsCancel(scope.$index, scope.row)">取消任务</el-button>
            <el-button v-if="scope.row.status === 0" type="danger" size="mini" @click="mainJobsImmediate(scope.$index, scope.row)">立即执行</el-button>
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
import { getMainJobsList, mainJobsCancel, mainJobsImmediate, getJobsOfMainThreadList, getJobsScheduleList } from '@/api/mainJobs'

export default {
  data() {
    return {
      list: null,
      listLoading: false,
      listTotal: 0,
      page: 1,
      per_page: 20,
      formSearch: {
        target_id: '',
        status: '',
        create_time_range: [],
        update_time_range: []
      },
      statusArr: [
        { value: 0, label: '等待' },
        { value: 1, label: '执行' },
        { value: 2, label: '成功' },
        { value: 3, label: '延期' },
        { value: 4, label: '失败' },
        { value: 5, label: '异常' },
        { value: 6, label: '取消' },
        { value: 7, label: '结束' }
      ]
    }
  },
  computed: {
    parentid() {
      return this.$route.params.mainthreadsid || ''
    }
  },
  created() {
    if (this.$route.name === 'JobsSchedule') {
      this.getJobsSchedule()
    } else {
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      if (this.listLoading) return
      var params = {
        page: this.page - 1,
        per_page: this.per_page
      }
      if (this.formSearch.target_id !== '') {
        params.target_id = this.formSearch.target_id
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
      if (this.parentid) {
        getJobsOfMainThreadList({ params: params, parentid: this.parentid }).then(response => {
          this.list = response.data.items || []
          this.listTotal = response.data.total || 0
          this.listLoading = false
        }).catch(error => {
          console.log(error)
          this.listLoading = false
        })
      } else {
        getMainJobsList(params).then(response => {
          this.list = response.data.items || []
          this.listTotal = response.data.total || 0
          this.listLoading = false
        }).catch(error => {
          console.log(error)
          this.listLoading = false
        })
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    mainJobsCancel(index, row) {
      if (this.listLoading) return
      this.$confirm('确定要取消此任务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {
          id: row.id
        }
        this.listLoading = true
        mainJobsCancel(params).then(response => {
          this.list[index] = response.data
          this.$message({
            message: '任务已取消！',
            type: 'success'
          })
          this.listLoading = false
        }).catch(error => {
          console.log(error)
          this.listLoading = false
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消'
        // });
      })
    },
    mainJobsImmediate(index, row) {
      if (this.listLoading) return
      this.$confirm('确定要执行此任务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {
          id: row.id
        }
        this.listLoading = true
        mainJobsImmediate(params).then(response => {
          this.list[index] = response.data
          this.$message({
            message: '任务已开始执行！',
            type: 'success'
          })
          this.listLoading = false
        }).catch(error => {
          console.log(error)
          this.listLoading = false
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消'
        // });
      })
    },
    getJobsSchedule() {
      if (this.listLoading) return
      var params = {
        page: this.page - 1,
        per_page: this.per_page
      }
      this.listLoading = true
      getJobsScheduleList(params).then(response => {
        this.list = response.data.items || []
        this.listTotal = response.data.total || 0
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
