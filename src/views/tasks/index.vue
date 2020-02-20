<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>主线程</span>
          </div>
          <div class="cardData">
            <p>
              <span class="cardLabel">状态</span>
              <font v-if="main.status === 0" color="#67C23A">{{ main.statusstr }}</font>
              <font v-else-if="main.status === 1" color="#E6A23C">{{ main.statusstr }}</font>
              <font v-else-if="main.status === 2" color="#F56C6C">{{ main.statusstr }}</font>
            </p>
            <p><span class="cardLabel">运行标识</span>{{ main.flag }}</p>
            <p><span class="cardLabel">任务</span>{{ main.job }}
              <router-link to="/task/schedule">
                查看任务<i class="el-icon-arrow-right" />
              </router-link>
            </p>
            <p><span class="cardLabel">调度开始时间</span>{{ main.schedule }}</p>
            <p><span class="cardLabel">循环次数</span>{{ main.cycle }}</p>
            <p><span class="cardLabel">运行次数</span>{{ main.execute }}</p>
            <p><span class="cardLabel">成功次数</span>{{ main.success }}</p>
            <p><span class="cardLabel">异常次数</span>{{ main.exception }}</p>
            <p><span class="cardLabel">运行日志</span>{{ main.log || '无' }}</p>
          </div>
          <div class="bottom clearfix">
            <el-button v-if="main.status === 0 && main.flag === 0" type="primary" @click="stopMain">停止</el-button>
            <el-button v-else type="primary" disabled>停止</el-button>
            <!-- <el-button v-if="monitor.status !== 0" type="primary" @click="restartMain">重启</el-button>
            <el-button v-else type="primary" disabled>重启</el-button> -->
            <el-button type="primary" @click="restartMain">重启</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getMainThreadsLast, getLastMonitor, stopMain, restartMain } from '@/api/mainJobs'

export default {
  data() {
    return {
      main: {},
      monitor: {},
      listLoading: false
    }
  },
  created() {
    // this.getLastMonitor()
    this.fetchData()
  },
  methods: {
    fetchData() {
      if (this.listLoading) return
      this.listLoading = true
      getMainThreadsLast().then(response => {
        this.main = response.data || {}
        this.listLoading = false
      }).catch(error => {
        console.log(error)
        this.listLoading = false
      })
    },
    getLastMonitor() {
      if (this.listLoading) return
      this.listLoading = true
      getLastMonitor().then(response => {
        this.monitor = response.data || {}
        this.listLoading = false
      }).catch(error => {
        console.log(error)
        this.listLoading = false
      })
    },
    stopMain(index, row) {
      if (this.listLoading) return
      this.$confirm('确定要停止此任务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        stopMain().then(response => {
          var backdata = response.data
          if (backdata.flag === 1) {
            this.$message({
              message: '任务已停止！',
              type: 'success'
            })
            this.main = backdata
          }
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
    restartMain(index, row) {
      if (this.listLoading) return
      this.$confirm('确定要重启此任务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        restartMain().then(response => {
          var backdata = response.data
          if (backdata.last.flag === 2) {
            this.$message({
              message: '任务已重启！',
              type: 'success'
            })
            this.main = backdata.new
          }
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
    }
  }
}
</script>
<style scoped>
.cardData p {
  position: relative;
  min-height: 20px;
  line-height: 20px;
  text-align: right;
}
.cardLabel {
  position: absolute;
  left: 0;
  top: 0;
}
.bottom {
  margin-top: 30px;
}
</style>
