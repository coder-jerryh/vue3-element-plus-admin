<template>
  <div class="eTree" :class="{ hidden: !treeSwitch }">
    <header>
      <!-- 查询 -->
      <el-input
        v-model="schoolAppName"
        class="search"
        placeholder="学校应用名称"
        clearable
        @keyup.enter="search"
      >
        <template #append>
          <el-button icon="el-icon-search" @click="search" />
        </template>
      </el-input>
      <!-- 分页 (展示复选框不要分页) -->
      <el-pagination
        v-if="!showCheckbox"
        class="page"
        layout="prev, pager, next"
        :current-page="pages.current"
        :total="pages.totalNum"
        :page-size="pages.size"
        :pager-count="5"
        @current-change="changePage"
      />
    </header>
    <el-tree
      ref="tree"
      v-loading="loading"
      class="tree"
      :indent="0"
      highlight-current
      :check-strictly="isSearchFlag"
      :accordion="currentTreeType == 'schoolDetail' || showCheckbox"
      :default-expand-all="currentTreeType == 'school' || currentTreeType == 'allSchool'"
      :data="treeData"
      :props="defaultProps"
      :show-checkbox="showCheckbox"
      :current-nodekey="currentNodekey"
      :node-key="nodeKey"
      :default-expanded-keys="defaultExpandedKey"
      :filter-node-method="filterNode"
      empty-text="暂无学校数据"
      @node-click="clickTree"
    >
      <template #default="{ node }">
        <el-tooltip effect="dark" :content="node.label" placement="top" :open-delay="600">
          <span class="span-ellipsis">{{ node.label }}</span>
        </el-tooltip>
      </template>
    </el-tree>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import { mapState, mapMutations } from 'vuex'
  import { getSchoolTreeApi } from '../../api/index'
  import config from '../../config/index'
  const attributes = {
    0: '全部学校',
    1: '学校应用',
    2: '学校',
    3: '班级',
    4: '老师',
    5: '学生',
    6: '家长',
    7: '学段',
    8: '年级',
    9: '后勤',
    10: '区域'
  }
  export default defineComponent({
    name: 'ETree',
    props: {
      // 绑定的数据
      value: [Object, Array],
      // 学校树类型（引用为页面子组件时传递）
      treeType: String,
      // 是否显示复选框
      showCheckbox: Boolean,
      // diasbled数组
      disabledKeys: {
        type: Array,
        default() {
          return []
        }
      },
      defaultExpandedKey: {
        type: Array,
        default() {
          return ['null']
        }
      },
      // node-key
      nodeKey: {
        type: String,
        default() {
          return 'id' // corpSchoolNum
        }
      },
      // 筛选
      filterKv: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        // loading
        loading: true,
        // 是否搜索过
        isSearchFlag: false,
        // school:只有学校，allSchool:全部学校+学校，schoolDetail整个学校详情，areaSchool带区域学校树
        currentTreeType: '',
        // 控制显隐
        hidden: false,
        // 按学校应用搜索
        schoolAppName: '',
        // 分页
        pages: {
          current: 1,
          size: 10,
          totalNum: 0
        },
        // 主数据
        treeData: [
          // {
          //   name: '成都实外新都五龙山学校',
          //   children: [{
          //     attribute: 2,
          //     schoolNum: 111519553,
          //     corpId: 'dingc1f55c6031cc41c135c2f4657eb6378f',
          //     name: '成都市新都区斑竹园镇斑竹园初级中学'
          //   }]
          // }
        ],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        // 默认选中
        currentNodekey: ''
      }
    },
    computed: {
      ...mapState(['treeSwitch', 'schoolInfo'])
    },
    watch: {
      $route() {
        // 切换页面打开树
        this.clickTreeSwicth(true)
      },
      value() {
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(this.value)
        })
      },
      schoolAppName() {
        if (this.schoolAppName === '') {
          // showChecked用elTree自带搜索
          if (this.showCheckbox) {
            this.$refs.tree.filter(this.schoolAppName)
          } else {
            // 搜索过才请求接口，为false表示用户未搜索过，所以清空的时候不需要请求接口
            if (this.isSearchFlag) {
              this.pages.current = 1
              this.getTree()
            }
          }
          this.isSearchFlag = false
        }
      }
    },
    created() {
      // 根据路由或者props获取学校树的类型
      this.currentTreeType = this.treeType || this.$route.meta.treeType
    },
    mounted() {
      // 不需要分页
      if (this.showCheckbox) {
        delete this.pages.size
        delete this.pages.current
      }
      if (config.env === 'dev') {
        this.schoolAppName = '黑马'
      }
      this.getTree()
    },
    methods: {
      ...mapMutations(['saveSchoolInfo', 'saveFullSchoolInfo', 'clickTreeSwicth']),
      // 获取树
      getTree() {
        this.loading = true
        const query = this.$FQ({
          ...this.pages,
          schoolAppName: this.schoolAppName,
          ...this.filterKv
        })
        getSchoolTreeApi(this.currentTreeType, query)
          .then((res) => {
            var data = res.data
            // 全部学校需要添加“全部学校”
            if (this.currentTreeType === 'allSchool') {
              data.unshift({
                name: '全部学校',
                attribute: 0,
                schoolNum: '',
                corpId: '',
                id: 0
              })
              // 默认选择第一项：“全部学校”
              this.currentNodekey = 0
              this.$nextTick(() => {
                this.$refs.tree.setCurrentKey(this.currentNodekey)
              })
            } else if (this.showCheckbox) {
              // 学校管理员
              // 过滤掉出只有app的
              data = data.filter((item) => item.children && item.children.length)
              data = [{ name: '学校应用', children: data, corpSchoolNum: 'null' }]
            }
            this.treeData = data
            // 页码
            this.pages.totalNum = res.total
            // 递归添加属性 (nodekey不等于id、有disabledKeys)
            if (this.nodeKey === 'corpSchoolNum' || this.disabledKeys.length) {
              this.recursion(res.data)
            }
            // schoolType不等于schoolDetail且不是checkbox类型，默认展开所有学校
            // if (this.currentTreeType === 'school' || this.currentTreeType === 'allSchool') {
            //   this.expandAllNode()
            // }
          })
          .finally(() => {
            this.loading = false
          })
      },
      // 改变page
      changePage(val) {
        this.pages.current = val
        this.getTree()
      },
      // 搜索
      search() {
        // showChecked用elTree自带搜索
        this.isSearchFlag = true
        if (this.showCheckbox) {
          this.$refs.tree.filter(this.schoolAppName)
        } else {
          this.pages.current = 1
          this.getTree()
        }
      },
      filterNode(value, data) {
        return data.name.indexOf(value) !== -1
      },
      // 点击树
      clickTree(data) {
        if (this.showCheckbox) return
        // 类型
        const attributeStr = attributes[data.attribute]
        // 学校类型：点击学校才存学校信息到Vuex
        const isSchoolType = this.currentTreeType === 'school' && attributeStr === '学校'
        // 全部学校类型：点击学校、全部学校时才存学校信息到Vuex
        const isAllSchoolType =
          this.currentTreeType === 'allSchool' && ['学校', '全部学校'].includes(attributeStr)
        // 学校详情类型：点击非班级时才存学校信息到Vuex
        const isSchoolDetailType =
          this.currentTreeType === 'schoolDetail' && attributeStr !== '班级'
        // 组装要存的数据
        var schoolInfo = {
          ...data,
          // 只有“学校”层级才有treatyType，所以要在点击“学校”层级的时候把treatyType放到store里
          // 后面层级如果没有treatyType就直接从store获取treatyType，如果有则需要替换
          treatyType: data.treatyType ? data.treatyType : this.schoolInfo.treatyType,
          schoolItemName: data.name,
          schoolName: attributeStr === '学校' ? data.name : this.schoolInfo.schoolName,
          attributeStr: attributeStr,
          dingding: data.corpId
        }
        // 去除为null、name、children的值或属性
        for (const key in schoolInfo) {
          if (!schoolInfo[key] || key === 'name' || key === 'children') {
            delete schoolInfo[key]
            continue
          }
        }
        if (isSchoolType || isAllSchoolType || isSchoolDetailType) {
          // 保存学校信息到vuex
          this.saveSchoolInfo(schoolInfo)
          // 保存完整的学校树信息
          this.saveFullSchoolInfo({ [this.currentTreeType]: schoolInfo })
        }
      },
      getCurrentKeys() {
        return this.$refs.tree.getCheckedKeys().filter((item) => !item.includes('null'))
      },
      // 递归添加属性
      recursion(data) {
        const recursion = (item) => {
          if (item.children && item.children.length) {
            item.children.forEach((child, index) => {
              // 添加属性corpSchoolNum
              var corpSchoolNum = child.corpId + ',' + child.schoolNum
              // 带区域学校树必须要corpSchoolNum属性，所以造一个假的唯一的corpId，无实际意义
              if (attributes[child.attribute] === '区域') {
                corpSchoolNum = 10 + 'null' + index
              }
              if (this.nodeKey === 'corpSchoolNum') {
                this.$set(child, 'corpSchoolNum', corpSchoolNum)
              }
              // 设置disabled不可选择项
              if (this.disabledKeys.length) {
                if (this.disabledKeys.includes(corpSchoolNum)) {
                  this.$set(child, 'disabled', true)
                }
              }
              recursion(child)
            })
          }
        }
        recursion({ children: data })
      },
      // 全部展开
      expandAllNode() {
        // 要展开的学校树类型
        const needExpandTypes = ['school', 'allSchool']
        if (needExpandTypes.includes(this.currentTreeType)) {
          this.$nextTick(() => {
            for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
              this.$refs.tree.store._getAllNodes()[i].expanded = true
            }
          })
        }
      }
    }
  })
</script>
<style lang="scss" scoped>
  .eTree {
    background: #fff;
    height: 100%;
    margin-right: 10px;
    border-radius: 2px;
    width: 250px;
    display: flex;
    @extend .scroller;
    flex-direction: column;
    transition: all 0.4s cubic-bezier(0.43, 0, 0.35, 1.21);
    opacity: 1;
    overflow: hidden;
    &.hidden {
      width: 0;
      margin-right: 0;
      opacity: 0.1;
    }
    header {
      border-bottom: $border;
      .search {
        padding: 12px;
        transition: all 0.5s ease;
        overflow: hidden;
        ::v-deep .el-input__suffix {
          top: 2px;
          right: 15px;
        }
        ::v-deep .el-input-group__append {
          padding: 0 14px;
          .el-icon-search {
            position: relative;
            top: 2px;
          }
        }
      }
      .page {
        margin-top: -6px;
        display: flex;
        justify-content: space-between;
        padding: 2px 6px 4px 6px;
        ::v-deep button i {
          font-size: 14px;
        }
        ::v-deep .el-pager {
          max-width: 168px;
          overflow: hidden;
          min-width: 88px;
          display: flex;
          justify-content: center;
          li {
            min-width: 30px;
          }
        }
      }
    }
    .tree {
      flex: 1;
      overflow: auto;
      padding: 10px;
      width: 100%;
    }
    .span-ellipsis {
      width: fit-content;
      @extend .one-line;
      display: block;
      font-size: 13px;
      height: 30px;
      line-height: 30px;
    }
    ::v-deep .el-tree-node__content {
      height: 30px;
      .el-tree-node__expand-icon {
        font-size: 14px;
      }
    }
    ::v-deep .el-tree-node__label {
      width: 100%;
      @extend .one-line;
    }
    // 高亮颜色
    ::v-deep .el-tree-node {
      transition: all 0.2s ease;
      &:focus > .el-tree-node__content {
        // background-color: #ecf5ff;
        // color: #66b1ff;
        background-color: #eaf4ff;
      }
    }
  }
  ::v-deep .tree {
    .el-tree-node {
      position: relative;
      // 竖线
      &::before {
        content: '';
        height: 100%;
        width: 1px;
        position: absolute;
        left: -3px;
        top: -24px;
        border-width: 1px;
        border-left: 1px dashed rgb(121, 187, 255);
      }
      // 当前层最后一个节点的竖线高度固定
      &:last-child::before {
        height: 40px; // 可以自己调节到合适数值
      }

      // 横线
      &::after {
        content: '';
        width: 6px;
        height: 20px;
        position: absolute;
        left: -2px;
        top: 15px;
        border-width: 1px;
        border-top: 1px dashed rgb(121, 187, 255);
      }
    }
    .el-tree-node__children {
      padding-left: 16px; // 缩进量
    }

    // 去掉最顶层的虚线，放最下面样式才不会被上面的覆盖了
    & > .el-tree-node::after {
      border-top: none;
    }
    & > .el-tree-node::before {
      border-left: none;
    }
    .el-checkbox {
      margin: 0 6px 0 2px;
    }
    // 展开关闭的icon
    .el-tree-node__expand-icon {
      padding: 6px 4px 6px 8px;
      font-size: 12px !important;
      color: #e6a23c;
      &::before {
        font-family: 'iconfont';
        content: '\e604';
      }
      &.expanded {
        transform: rotate(0);
        &::before {
          content: '\e603';
        }
      }
      &.is-leaf {
        font-size: 15px !important;
        color: #409eff;
        &::before {
          content: '\e685';
        }
      }
    }
  }
</style>
