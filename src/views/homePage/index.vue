<template>
  <div class="homePage">
    <menu-panel />
    <div class="selectSchool">
      <h1>请选择学校</h1>
      <e-selecter
        v-model="corpIdSchoolNum"
        :search-option="treeData"
        size="small"
        :clearable="false"
        placeholder="选择学校"
      />
    </div>
    <checking-panel :corp-id-school-num="corpIdSchoolNum" />
    <div class="bottomPanel">
      <device-stat-panel :corp-id-school-num="corpIdSchoolNum" />
      <div class="smallPanel">
        <pay-panel :corp-id-school-num="corpIdSchoolNum" />
        <pay-stat-panel :corp-id-school-num="corpIdSchoolNum" />
        <service-stat-panel :corp-id-school-num="corpIdSchoolNum" />
      </div>
    </div>
  </div>
</template>

<script>
  import menuPanel from './menuPanel.vue'
  import checkingPanel from './checkingPanel.vue'
  import deviceStatPanel from './deviceStatPanel.vue'
  import payPanel from './payPanel.vue'
  import payStatPanel from './payStatPanel.vue'
  import serviceStatPanel from './serviceStatPanel.vue'
  import { getSchoolTreeApi } from '../../api/index.js'
  import { onMounted, ref } from 'vue'
  export default {
    name: 'HomePage',
    components: {
      menuPanel,
      checkingPanel,
      deviceStatPanel,
      payPanel,
      payStatPanel,
      serviceStatPanel
    },
    setup() {
      var treeData = ref([])
      var corpIdSchoolNum = ref('')
      const getSchool = () => {
        getSchoolTreeApi('school', '').then((res) => {
          res.data.forEach((item) => {
            item.children.forEach((child) => {
              treeData.value.push({
                label: child.name,
                value: child.corpId + ',' + child.schoolNum
              })
            })
          })
          corpIdSchoolNum.value = treeData.value.length ? treeData.value[0].value : null
        })
      }
      onMounted(() => {
        getSchool()
      })
      return {
        treeData,
        corpIdSchoolNum,
        getSchool
      }
    }
  }
</script>

<style scoped lang="scss">
  .homePage {
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    .selectSchool {
      padding: 32px 32px 26px;
      border-radius: 5px 5px 0 0;
      margin-top: 10px;
      background: #fff;
      display: flex;
      align-items: center;
      h1 {
        font-size: 20px;
        color: #1a1a1a;
        margin-right: 20px;
      }
    }
    .bottomPanel {
      height: 980px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      .smallPanel {
        height: 100%;
        width: calc(50% - 5px);
        display: flex;
        flex-direction: column;
        ::v-deep(.payStatPanel) {
          margin-top: 10px;
        }
      }
    }
  }
</style>
