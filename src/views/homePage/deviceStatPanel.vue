<template>
  <div class="deviceStatPanel">
    <h2>本周设备事件统计</h2>
    <div v-loading="loading" class="wrap">
      <div id="deviceStatPanel" style="width: 100%; height: 360px"></div>
      <el-table :data="tableData" max-height="540">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="deviceName" label="设备名称">
          <template #default="scope"> {{ scope.row.deviceName }} </template>
        </el-table-column>
        <el-table-column prop="number" label="次数" />
        <el-table-column prop="date" label="离线时间" />
      </el-table>
      <transition name="fade">
        <e-empty-layout v-if="showNoData" text="暂无数据" />
      </transition>
    </div>
  </div>
</template>

<script>
  import eEmptyLayout from '../../components/display-components/e-empty-layout.vue'
  import { getDeviceStatApi } from '../../api/index'
  import { dateFilter } from '../../utils/filter'
  export default {
    components: {
      eEmptyLayout
    },
    props: {
      corpIdSchoolNum: String
    },
    data() {
      return {
        loading: true,
        tableData: [],
        series: [],
        pages: {},
        renderShow: false,
        showNoData: false
      }
    },
    watch: {
      corpIdSchoolNum() {
        if (this.corpIdSchoolNum) {
          this.loading = true
          this.showNoData = false
          this.getDeviceStat()
        } else {
          this.showNoData = true
          this.loading = false
        }
      }
    },
    methods: {
      dateFilter,
      getData() {},
      drawLine(id, data) {
        this.charts = this.$root.echarts.init(document.getElementById(id))
        this.charts.setOption({
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            bottom: '7%',
            data: []
          },
          grid: {
            left: '0%',
            right: '4%',
            bottom: '20%',
            top: '8%',
            containLabel: true
          },

          toolbox: {
            feature: {}
          },
          xAxis: {
            type: 'category',
            data: data.xAxis
          },
          yAxis: {
            type: 'value',
            minInterval: 1
          },
          series: [
            {
              name: '离线次数',
              type: 'line',
              data: data.series.map((item) => item || 0),
              smooth: true, // true 为平滑曲线，false为直线
              lineStyle: {
                color: '#E5A147', // 改变折线点的颜色
                lineStyle: {
                  color: '#E5A147' // 改变折线颜色
                }
              }
            }
          ]
        })
        if (this.renderShow) {
          this.charts.resize()
        }
        this.renderShow = true
      },
      getDeviceStat() {
        const noData = { xAxis: ['暂无设备'], series: [0, 0, 0, 0] }
        const corpId = this.corpIdSchoolNum.split(',')[0]
        const schoolNum = this.corpIdSchoolNum.split(',')[1]
        getDeviceStatApi({ corpId, schoolNum })
          .then(({ data }) => {
            if (data && data.series) {
              this.tableData = data.table.sort((a, b) => new Date(b.date) - new Date(a.date))
              this.$nextTick(() => {
                this.drawLine('deviceStatPanel', data)
              })
            } else {
              this.$nextTick(() => {
                this.drawLine('deviceStatPanel', noData)
              })
            }
          })
          .finally(() => {
            this.loading = false
          })
          .catch(() => {
            this.showNoData = true
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  .deviceStatPanel {
    height: 100%;
    width: calc(50% - 5px);
    margin-right: 10px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.05);
    padding: 32px;
    h2 {
      font-size: 20px;
      color: #333;
    }
    .wrap {
      height: 100%;
      position: relative;
      >>> .eEmptyLayout {
        background: #fff;
      }
    }
  }
</style>
