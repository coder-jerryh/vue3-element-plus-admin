<template>
  <div class="payStatPanel">
    <h2>今日渠道缴费统计</h2>
    <div v-loading="loading" class="wrap">
      <div id="payStatPanel" style="width: 100%; height: 225px"></div>
      <transition name="fade">
        <e-empty-layout v-if="showNoData" text="暂无数据" />
      </transition>
    </div>
  </div>
</template>

<script>
  import { getOrderPayTypeStatApi } from '../../api/index'
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
          this.getOrderPayTypeStat()
        } else {
          this.showNoData = true
          this.loading = false
        }
      }
    },
    methods: {
      getOrderPayTypeStat() {
        const noData = [{ name: '暂无渠道', value: 0 }]
        const corpId = this.corpIdSchoolNum.split(',')[0]
        const schoolNum = this.corpIdSchoolNum.split(',')[1]
        getOrderPayTypeStatApi({ corpId, schoolNum })
          .then(({ data }) => {
            if (!data || !data.length) {
              data = [...noData]
            }
            this.$nextTick(() => {
              this.drawBlock('payStatPanel', data)
            })
          })
          .finally(() => {
            this.loading = false
          })
          .catch(() => {
            this.showNoData = true
          })
      },
      drawBlock(id, data) {
        this.charts = this.$root.echarts.init(document.getElementById(id))
        this.charts.setOption({
          color: ['#46A0FC'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: '8%',
            left: '3%',
            right: '4%',
            bottom: '0%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: data.map((item) => item.name),
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              minInterval: 5
            }
          ],
          series: [
            {
              name: '支付渠道',
              type: 'bar',
              barWidth: '40px',
              data
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
  .payStatPanel {
    flex: 1;
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
