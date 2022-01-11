<template>
  <div class="payPanel">
    <h2>正在缴费数据统计</h2>
    <div v-loading="loading" class="wrap">
      <div id="payPanel" style="width: 100%; height: 225px"></div>
      <transition name="fade">
        <e-empty-layout v-if="showNoData" text="暂无数据" />
      </transition>
    </div>
  </div>
</template>

<script>
  import { getTermTotalApi } from '../../api/index'
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
        name: localStorage.getItem('ms_username'),
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
          this.getTermTotal()
        } else {
          this.showNoData = true
          this.loading = false
        }
      }
    },
    methods: {
      getTermTotal() {
        const noData = [{ name: '缴费人数', value: 0 }]
        const corpId = this.corpIdSchoolNum.split(',')[0]
        const schoolNum = this.corpIdSchoolNum.split(',')[1]
        getTermTotalApi({ corpId, schoolNum })
          .then(({ data }) => {
            if (!data || !data.length) {
              data = [...noData]
            }
            this.$nextTick(() => {
              this.drawBlock('payPanel', data)
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
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 0,
            bottom: 0,
            data: data.map((item) => item.name)
          },
          color: ['#6BC73B', '#46A0FC'],
          series: [
            {
              name: '数据统计',
              type: 'pie',
              radius: '70%', // 饼图大小
              center: ['50%', '55%'],
              data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
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
  .payPanel {
    flex: 1;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.05);
    padding: 32px;
    position: relative;
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
    // p{
    //   color: #999;
    //   font-size: 14px;
    //   padding-left: 20px;
    //   position: absolute;
    //   bottom: 8px;
    // }
  }
</style>
