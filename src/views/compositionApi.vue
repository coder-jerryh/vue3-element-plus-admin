<template>
  <div class="wrap">
    <!-- 子组件 -->
    <button @click="onTest">测试</button>
    <child
      ref="child"
      v-model="parentData"
      v-model:parentDataTwo="parentDataTwo"
      :parent-data="parentData"
      :test="test"
      @update="updateData"
    />
    <h1>Vue3 新增的几种composition Api (组合式API)</h1>
    <h2>defineComponent、ref、reactive、toRefs、readonly、computed、watchEffect、watch</h2>
    <!-- setup -->
    <section>
      <h3> 一、setUp函数 </h3>
      <h4>1. 使用Composition API 的入口</h4>
      <h4>2. 在beforeCreate和created之前调用</h4>
      <h4>3. 在setup中没有this，指向undefined</h4>
      <h4>4. 在setup中是不能使用data和methods，因为还没初始化</h4>
    </section>
    <!-- ref -->
    <section>
      <h3>二、ref：用于声明String、Number、Boolean、Array类型的响应式数据</h3>
      <h4>1. 使用方法：</h4>
      <article>
        <p>(1) import { ref } from 'vue'</p>
        <p>(2) 在setup中，声明：var fullName = ref('Jerry')</p>
        <p>(3) return { fullName } </p>
      </article>
      <h4>2.实践</h4>
      <p>
        我的名字是：<span>{{ fullName }}</span>
      </p>
      <p>名字数组：{{ arr }}</p>
      <label>在这里修改名字：<input v-model="fullName" type="text" /></label>
      <p class="tips">
        *通过ref声明的数据，在setup中获取的话，需要加<span>.value</span>，如：fullName.value
      </p>
    </section>
    <!-- reactive -->
    <section>
      <h3>三、reactive：用于声明Object类型的响应式数据</h3>
      <h4>1. 使用方法：</h4>
      <article>
        <p>(1) import { reactive } from 'vue'</p>
        <p> (2) 在setup中，声明：var userInfo = ref( { name: 'Tom', age: 24 } ) </p>
        <p>(3) return { userInfo } </p>
      </article>
      <h4>2.实践</h4>
      <p>
        <i>我的名字是：</i>
        <span>{{ userInfo.name || '暂无' }}</span>
        <i>，今年</i>
        <span>{{ userInfo.age || '暂无' }}</span>
        <i>岁</i>
      </p>
      <label>在这里修改名字：<input v-model="userInfo.name" type="text" /></label>
      <label>在这里修改年龄：<input v-model="userInfo.age" type="text" /></label>
    </section>
    <!-- toRefs -->
    <section>
      <h3>四、toRefs：用于解构reactive声明的对象</h3>
      <h4>1. 使用方法：</h4>
      <article>
        <p>(1) import { reactive, toRefs } from 'vue'</p>
        <p>
          (2) 在setup中，声明：var contactInfo = ref( { mobile: 18888888888, QQ: 332983810 } )
        </p>
        <p>(3) return { ...toRefs(contactInfo) } </p>
      </article>
      <h4>2.实践</h4>
      <p>
        <i>我的手机号是：</i>
        <span>{{ mobile || '暂无' }}</span>
        <i>，</i>
        <i>QQ号是：</i>
        <span>{{ QQ || '暂无' }}</span>
      </p>
      <label>在这里修改手机号：<input v-model="mobile" type="text" /></label>
      <label>在这里修改QQ：<input v-model="QQ" type="text" /></label>
    </section>
    <!-- readonly -->
    <section>
      <h3>四、readonly：用于将使用reactive声明的响应式数据变成原始数据 (非响应式) —— 不常用</h3>
      <h4>1. 使用方法：</h4>
      <article>
        <p>(1) import { reactive, readonly, toRefs } from 'vue'</p>
        <p>
          (2) 在setup中，声明：var contactInfo = ref( { mobile: 18888888888, QQ: 332983810 } )
        </p>
        <p> (2) 在setup中，声明：contactInfo = readonly(在setup中，声明：contactInfo) </p>
        <p>(3) return { ...toRefs(contactInfo) } </p>
      </article>
    </section>
    <!-- toRefs -->
    <section>
      <h3>六、在setup中绑定方法</h3>
      <h4>1. 使用方法：</h4>
      <article>
        <p> (1) 在setup中，声明：const changeNum = () => {} </p>
        <p>(3) return { changeNum } </p>
      </article>
      <h4>2.实践 (计数器)</h4>
      <div class="changeNum">
        <button @click="changeNum(-1)">-</button>
        <input v-model="num" type="text" />
        <button @click="changeNum(1)">+</button>
      </div>
    </section>
    <!-- computed -->
    <section>
      <h3> 七、computed计算属性 </h3>
      <h4>1. 使用方法：</h4>
      <article>
        <p>(1) import { computed } from 'vue'</p>
        <p>(2) 在setup中，声明：var computedNum = computed(() => { return num.value * 10 }) </p>
        <p>(3) return { computedNum } </p>
      </article>
      <p style="margin-top: 10px">
        计步器值的平方：<span>{{ computedNum }}</span>
      </p>
    </section>
    <!-- watchEffect -->
    <section>
      <h3>七、watchEffect监听</h3>
      <h4>1. 使用方法：</h4>
      <article>
        <p>(1) import { watchEffect } from 'vue'</p>
        <p>(2) watchEffect(() => {}) </p>
      </article>
      <p style="margin-top: 10px">
        当前计步器的值【{{ num }}】是奇数还是偶数：<span>{{ isEvenOdd }}</span>
      </p>
      <p class="tips">*1、若监听对象的话，可以具体监听对象里的某一个属性</p>
      <p class="tips">*2、监听的数据改不改变都会触发一次，有点类似watch的immediate属性，立即执行</p>
    </section>
    <!-- watch -->
    <section>
      <h3>七、watch监听</h3>
      <h4>1. 使用方法：</h4>
      <article>
        <p>(1) import { watch } from 'vue'</p>
        <p>(2) watch(监听的数据(不加<span>.value</span>), (newVal, oldVal) => {}) </p>
      </article>
      <p style="margin-top: 10px">
        当前计步器的值【{{ num }}】是奇数还是偶数：<span>{{ isEvenOdd }}</span>
      </p>
      <p class="tips">
        *1、若监听对象的话，只能监听<span>整个对象</span>，不能直接监听对象里的某个属性
      </p>
      <p class="tips">*2、监听的数据如果不改变，则不会触发</p>
      <p class="tips">*3、可获取到监听前和监听后变化的数据</p>
    </section>
    <!-- 生命周期函数 -->
    <section>
      <h3>八、生命周期函数</h3>
      <h4>1. 使用方法：</h4>
      <article>
        <p>(1) import { onMounted } from 'vue'</p>
        <p>(2) 在setup中，onMounted(()=> { })</p>
      </article>
      <h4>2. 生命周期 (对比Vue2.x)</h4>
      <article class="period">
        <p>beforeCreate -> 使用setup()</p>
        <p>created -> 使用 setup()</p>
        <p>beforeMount -> onBeforeMount</p>
        <p>mounted -> onMounted</p>
        <p>beforeUpdate -> onBeforeUpdate</p>
        <p>updated -> onUpdated</p>
        <p>beforeDestroy -> onBeforeUnmount</p>
        <p>destroyed -> onUnmounted</p>
        <p>errorCaptured -> onErrorCaptured</p>
      </article>
    </section>
    <!-- props -->
    <section>
      <h3>九、setup使用父组件传递的props</h3>
      <h4>1. 使用方法：</h4>
      <article>
        <p>(1) 子组件接收：props: ['value']</p>
        <p>(2) setup(props) { console.log(props) }</p>
      </article>
    </section>
    <!-- 注意点 -->
    <section>
      <h3>十、注意点</h3>
      <h4>1. v-model</h4>
      <h4>2. ::v-deep(选择器)</h4>
      <h4>3. props form</h4>
      <h4>4. TS</h4>
      <h4>5. setup中获取全局变量和方法</h4>
    </section>
  </div>
</template>

<script lang="ts">
  import {
    ref,
    reactive,
    toRefs,
    defineComponent,
    computed,
    watchEffect,
    watch,
    onMounted,
    getCurrentInstance
    // readonly
  } from 'vue'
  import { useStore } from 'vuex'
  import { key } from '../store/index'
  import child from './child.vue'
  export default defineComponent({
    components: {
      child
    },
    setup(props, ctx) {
      const store = useStore(key)
      console.log(store.state.refreshFlag)
      // 通过ref声明响应式字符串
      var fullName = ref('Jerry')
      var parentData = ref('父组件的数组')
      var parentDataTwo = ref('父组件的数组2')
      var arr = ref(['张三', '李四', '王五'])
      // 通过reactive声明响应式对象
      const userInfo = reactive({
        name: 'Tom',
        age: 24
      })

      // 通过reactive声明响应式对象
      var contactInfo = reactive({
        mobile: 18888888888,
        QQ: 332983810
      })
      // contactInfo = readonly(contactInfo)

      // 通过ref声明响应式数字
      var num = ref(0)
      // 声明方法：修改计数器
      // function changeNum () {}
      const changeNum = (step: number) => {
        // ⚠️注意，通过ref声明的数据，需要写.value
        if (step == -1 && num.value == 0) return
        num.value += step
      }
      // 计算属性
      var computedNum = computed(() => {
        return num.value * num.value
      })
      // watchEffect监听
      // 非响应式
      // var isEvenOdd = ''
      var isEvenOdd2 = ref('')
      var isEvenOdd = ref('')
      watch(
        num,
        (newVal, oldVal) => {
          // num改不改变都会触发一次
          if (num.value % 2) {
            isEvenOdd.value = '奇数'
          } else {
            isEvenOdd.value = '偶数'
          }
          console.log('😭执行了watch😭')
          console.log(`watch监听变化前的数据：${oldVal}`)
          console.log(`watch监听变化后的数据：${newVal}`)
        },
        {
          immediate: true,
          deep: true
        }
      )
      // 响应式
      watchEffect(() => {
        // num改不改变都会触发一次
        if (num.value % 2) {
          isEvenOdd.value = '奇数'
        } else {
          isEvenOdd.value = '偶数'
        }
        console.log('😁执行了watchEffect😁')
      })
      // watch监听
      // 非响应式
      // var isEvenOdd2 = ''
      // 响应式

      // setup里使用生命周期函数
      onMounted(() => {
        console.log('😊执行了onMounted😊')
        closeBg()
      })
      // 关闭loading背景
      const closeBg = () => {
        const loadingBg: any = document.getElementById('loading')?.style
        loadingBg.visibility = 'hidden'
        loadingBg.opacity = 0
        const timer = setTimeout(() => {
          loadingBg.display = 'none'
          clearTimeout(timer)
        }, 1500)
      }
      // props
      console.log('这是props', props)
      // ctx
      console.log('这是ctx', ctx)
      // getCurrentInstance
      const { proxy } = getCurrentInstance()
      console.log(proxy)
      // console.log(proxy.$Toast('success', 'setup调用Toast提示框成功！'))
      return {
        // 返回响应式字符串
        fullName,
        // 返回响应式字符串
        num,
        // 返回响应式对象
        userInfo,
        // 返回响应式对象，通过toRefs解构
        // ...contactInfo，❌错误写法，可渲染，但数据不是响应式的
        ...toRefs(contactInfo),
        // 返回方法
        changeNum,
        // 计算属性
        computedNum,
        // watchEffect监听
        isEvenOdd,
        // watch监听
        isEvenOdd2,
        arr,
        parentData,
        parentDataTwo
      }
    },
    data() {
      return {
        test: 0
      }
    },
    mounted() {
      console.log(this.$Pages)
      this.$Toast('warning', 'mounted')
    },
    methods: {
      updateData(e) {
        this.parentData = e
      },
      onTest() {
        this.test++
        this.$refs.child.show = true
      }
    }
  })
</script>

<style lang="scss" scoped>
  .wrap {
    line-height: 2;
    width: 800px;
    padding: 20px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100%;
    article {
      line-height: 1;
      background: #f2f2f2;
      padding: 10px 18px;
      border-radius: 6px;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: 500;
      margin-top: 10px;
    }
    p {
      margin: 0;
      line-height: 2;
    }
    span {
      color: $danger;
    }
    input {
      border-radius: 4px;
      background: #f2f2f2;
      outline: 0;
      border: 0;
      padding: 10px;
      font-size: 14px;
    }
    label {
      display: block;
      margin-top: 12px;
    }
    i {
      font-style: normal;
    }
    section {
      margin-top: 30px;
    }
    .changeNum {
      display: flex;
      input {
        margin: 0 10px;
        width: 60px;
        border: 1px solid #ddd;
        text-align: center;
      }
    }
    button {
      width: 40px;
      font-size: 30px;
      background: rgb(79, 162, 240);
      color: #fff;
      border: 0;
      border-radius: 4px;
      outline: 0;
      transition: all ease 0.25s;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
      &:active {
        opacity: 1;
      }
    }
    .tips {
      margin-top: 6px;
      color: rgb(45, 124, 45);
    }
    .period {
      p {
        color: $danger;
        margin-top: 2px;
      }
    }
  }
</style>
