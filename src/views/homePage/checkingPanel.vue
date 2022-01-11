<template>
  <ul v-loading="loading" class="checkingPanel">
    <li v-for="index in 2" :key="index">
      <h2>{{ index == 1 ? '今日' : '本周' }}班级考勤</h2>
      <div class="wrap">
        <div>
          <div :id="`main${index}`" style="width: 100%; height: 360px"></div>
          <el-table :data="tableObjs[index]" height="250" border>
            <el-table-column type="index" label="序号" width="60" />
            <el-table-column prop="className" label="班级" />
            <el-table-column prop="shouldArriveNum" label="应到" width="70" />
            <el-table-column prop="arriveNum" label="实到" width="70" />
            <el-table-column prop="lateNum" label="迟到" width="70" />
            <el-table-column prop="truancy" label="旷课" width="70" />
          </el-table>
        </div>
        <transition name="fade">
          <e-empty-layout v-if="index == 1 && showDayNoData" text="暂无数据" />
        </transition>
        <transition name="fade">
          <e-empty-layout v-if="index == 2 && showWeekNoData" text="暂无数据" />
        </transition>
      </div>
    </li>
  </ul>
</template>

<script>
  import eEmptyLayout from '../../components/display-components/e-empty-layout.vue'
  import { getCheckingStatApi } from '../../api/index.js'
  export default {
    components: {
      eEmptyLayout
    },
    props: {
      corpIdSchoolNum: String
    },
    data() {
      return {
        charts: '',
        loading: true,
        name: localStorage.getItem('ms_username'),
        tableObjs: {},
        renderShow: false,
        pages: {},
        showDayNoData: false,
        showWeekNoData: false
      }
    },
    watch: {
      corpIdSchoolNum() {
        if (this.corpIdSchoolNum) {
          this.showDayNoData = false
          this.showWeekNoData = false
          this.getCheckingStat('day')
          this.getCheckingStat('week')
        } else {
          this.showNoData = true
          this.loading = false
        }
      }
    },
    methods: {
      getCheckingStat(dateRange) {
        this.loading = true
        const noData = {
          xAxis: ['应到人数', '实到人数', '迟到人数', '旷课人数'],
          series: [0, 0, 0, 0]
        }
        const corpId = this.corpIdSchoolNum.split(',')[0]
        const schoolNum = this.corpIdSchoolNum.split(',')[1]
        getCheckingStatApi({ corpId, schoolNum, dateRange })
          .then(({ data }) => {
            if (data && data.series) {
              var tableObjs = {}
              this.$nextTick(() => {
                if (dateRange === 'day') {
                  tableObjs[1] = data.series.filter((item) => item.className)
                  this.drawLine('main1', data)
                } else {
                  tableObjs[2] = data.series.filter((item) => item.className)
                  this.drawLine('main2', data)
                }
                this.tableObjs = { ...this.tableObjs, ...tableObjs }
              })
            } else {
              if (dateRange === 'day') {
                this.drawLine('main1', noData)
              } else {
                this.drawLine('main2', noData)
              }
            }
          })
          .catch(() => {
            this.getNoData(dateRange)
          })
          .finally(() => {
            this.loading = false
          })
      },
      getNoData(dateRange) {
        if (dateRange === 'day') {
          this.showDayNoData = true
        } else {
          this.showWeekNoData = true
        }
      },
      drawLine(id, data) {
        this.charts = this.$root.echarts.init(document.getElementById(id))
        this.charts.setOption({
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            top: '0%',
            data: ['应到人数', '实到人数', '迟到人数', '旷课人数']
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
            // boundaryGap: false, 开启x轴数据从原点位置开始
            data: data.xAxis,
            axisLabel: {
              interval: 2,
              rotate: 40
            }
          },
          dataZoom: [
            {
              type: 'slider',
              show: true, // flase直接隐藏图形
              xAxisIndex: [0],
              left: '12%', // 滚动条靠左侧的百分比
              right: '12%',
              bottom: '5%',
              start: 0, // 滚动条的起始位置
              end: 50 // 滚动条的截止位置（按比例分割你的柱状图x轴长度）
            }
          ],
          yAxis: {
            type: 'value',
            minInterval: 1
          },

          series: [
            {
              name: '应到人数',
              type: 'line',
              data: data.series.map((item) => item.shouldArriveNum || 0),
              smooth: true, // true 为平滑曲线，false为直线
              lineStyle: {
                color: '#6BC73B', // 改变折线点的颜色
                lineStyle: {
                  color: '#6BC73B' // 改变折线颜色
                }
              }
            },
            {
              name: '实到人数',
              type: 'line',
              data: data.series.map((item) => item.arriveNum || 0),
              smooth: true, // true 为平滑曲线，false为直线
              lineStyle: {
                color: '#46A0FC', // 改变折线点的颜色
                lineStyle: {
                  color: '#46A0FC' // 改变折线颜色
                }
              }
            },
            {
              name: '迟到人数',
              type: 'line',
              data: data.series.map((item) => item.lateNum || 0),
              smooth: true, // true 为平滑曲线，false为直线
              lineStyle: {
                color: '#F36D6F', // 改变折线点的颜色
                lineStyle: {
                  color: '#F36D6F' // 改变折线颜色
                }
              }
            },
            {
              name: '旷课人数',
              type: 'line',
              data: data.series.map((item) => item.truancy || 0),
              smooth: true, // true 为平滑曲线，false为直线
              lineStyle: {
                color: '#BEC2CC', // 改变折线点的颜色
                lineStyle: {
                  color: '#BEC2CC' // 改变折线颜色
                }
              }
            }
          ]
        })
        if (this.renderShow) {
          this.charts.resize()
        }
        this.renderShow = true
      }
    }
  }
</script>

<style scoped lang="scss">
  .checkingPanel {
    margin-bottom: 10px;
    background: #fff;
    border-radius: 0 0 5px 5px;
    box-shadow: 0px 5px 0px 0px rgba(0, 0, 0, 0.01);
    padding: 0 32px 32px;
    display: flex;
    width: 100%;
    > li {
      width: calc(50% - 20px);
      &:first-of-type {
        margin-right: 40px;
      }
      &:last-of-type {
        margin-left: 40px;
      }
      ::v-deep(td:after) {
        display: none !important;
      }
      h2 {
        font-size: 18px;
        color: #333;
      }
      .wrap {
        height: 100%;
        position: relative;
        ::v-deep(.eEmptyLayout) {
          background: #fff;
        }
      }
    }
  }
</style>
