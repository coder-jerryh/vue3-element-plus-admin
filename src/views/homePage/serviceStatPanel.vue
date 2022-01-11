<template>
  <div class="serviceStatPanel">
    <h2>本学期购买服务人数统计</h2>
    <div v-loading="loading" class="wrap">
      <div id="serviceStatPanel" style="width: 100%; height: 225px"></div>
      <transition name="fade">
        <e-empty-layout v-if="showNoData" text="暂无数据" />
      </transition>
    </div>
  </div>
</template>

<script>
  import { getChargeStatApi } from '../../api/index'
  import eEmptyLayout from '../../components/display-components/e-empty-layout.vue'
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
          this.getChargeStat()
        } else {
          this.showNoData = true
          this.loading = false
        }
      }
    },
    methods: {
      getChargeStat() {
        const noData = { 暂无服务人数: 0 }
        const corpId = this.corpIdSchoolNum.split(',')[0]
        const schoolNum = this.corpIdSchoolNum.split(',')[1]
        getChargeStatApi({ corpId, schoolNum })
          .then(({ data }) => {
            if (data) {
              this.$nextTick(() => {
                this.drawLine('serviceStatPanel', data.data)
              })
            } else {
              this.$nextTick(() => {
                this.drawLine('serviceStatPanel', noData)
              })
            }
          })
          .finally(() => {
            this.loading = false
          })
          .catch(() => {
            this.showNoData = true
          })
      },
      drawLine(id, data) {
        var xAxisData = []
        for (const key in data) {
          xAxisData.push(key)
        }
        var seriesData = []
        for (const key in data) {
          seriesData.push(data[key] || 0)
        }
        this.charts = this.$root.echarts.init(document.getElementById(id))
        this.charts.setOption({
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '0%',
            right: '4%',
            bottom: '0%',
            top: '8%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: xAxisData
          },
          yAxis: {
            type: 'value',
            splitNumber: 3,
            minInterval: 5
          },

          series: [
            {
              name: '人数',
              type: 'line',
              data: seriesData,
              smooth: true, // true 为平滑曲线，false为直线
              lineStyle: {
                color: '#F36D6F', // 改变折线点的颜色
                lineStyle: {
                  color: '#F36D6F' // 改变折线颜色
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
  .serviceStatPanel {
    flex: 1;
    margin-top: 10px;
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
      ::v-deep(.eEmptyLayout) {
        background: #fff;
      }
    }
  }
</style>
