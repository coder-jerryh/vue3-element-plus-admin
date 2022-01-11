<script>
  import { addResizeListener, removeResizeListener } from 'element-plus/es/utils/resize-event.js'
  const firstUpperCase = (str) => {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
  }
  export default {
    props: {},
    data() {
      return {
        scrollable: false,
        navOffset: 0,
        isFocus: false,
        focusable: true,
        tabPosition: 'top'
      }
    },
    computed: {
      navStyle() {
        const dir = ['top', 'bottom'].indexOf(this.tabPosition) !== -1 ? 'X' : 'Y'
        return {
          transform: `translate${dir}(-${this.navOffset}px)`
        }
      },
      sizeName() {
        return ['top', 'bottom'].indexOf(this.tabPosition) !== -1 ? 'width' : 'height'
      }
    },
    updated() {
      this.update()
    },
    mounted() {
      addResizeListener(this.$el, this.update)
    },
    beforeUnmount() {
      if (this.$el && this.update) removeResizeListener(this.$el, this.update)
    },
    methods: {
      scrollPrev() {
        const containerSize = this.$refs.navScroll[`offset${firstUpperCase(this.sizeName)}`]
        const currentOffset = this.navOffset

        if (!currentOffset) return

        const newOffset = currentOffset > containerSize ? currentOffset - containerSize : 0

        this.navOffset = newOffset
      },
      scrollNext() {
        const navSize = this.$refs.nav[`offset${firstUpperCase(this.sizeName)}`]
        const containerSize = this.$refs.navScroll[`offset${firstUpperCase(this.sizeName)}`]
        const currentOffset = this.navOffset

        if (navSize - currentOffset <= containerSize) return

        const newOffset =
          navSize - currentOffset > containerSize * 2
            ? currentOffset + containerSize
            : navSize - containerSize

        this.navOffset = newOffset
      },
      scrollToActiveTab() {
        if (!this.scrollable) return
        const nav = this.$refs.nav
        const activeTab = this.$el.querySelector('.is-active')
        if (!activeTab) return
        const navScroll = this.$refs.navScroll
        const isHorizontal = ['top', 'bottom'].indexOf(this.tabPosition) !== -1
        const activeTabBounding = activeTab.getBoundingClientRect()
        const navScrollBounding = navScroll.getBoundingClientRect()
        const maxOffset = isHorizontal
          ? nav.offsetWidth - navScrollBounding.width
          : nav.offsetHeight - navScrollBounding.height
        const currentOffset = this.navOffset
        let newOffset = currentOffset

        if (isHorizontal) {
          if (activeTabBounding.left < navScrollBounding.left) {
            newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left)
          }
          if (activeTabBounding.right > navScrollBounding.right) {
            newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right
          }
        } else {
          if (activeTabBounding.top < navScrollBounding.top) {
            newOffset = currentOffset - (navScrollBounding.top - activeTabBounding.top)
          }
          if (activeTabBounding.bottom > navScrollBounding.bottom) {
            newOffset = currentOffset + (activeTabBounding.bottom - navScrollBounding.bottom)
          }
        }
        newOffset = Math.max(newOffset, 0)
        this.navOffset = Math.min(newOffset, maxOffset)
      },
      update() {
        if (!this.$refs.nav) return
        const sizeName = this.sizeName
        const navSize = this.$refs.nav[`offset${firstUpperCase(sizeName)}`]
        this.height = this.$refs.nav[`offset${firstUpperCase('height')}`]
        const containerSize = this.$refs.navScroll[`offset${firstUpperCase(sizeName)}`]
        const currentOffset = this.navOffset
        if (containerSize < navSize) {
          const currentOffset = this.navOffset
          this.scrollable = this.scrollable || {}
          this.scrollable.prev = currentOffset
          this.scrollable.next = currentOffset + containerSize < navSize
          if (navSize - currentOffset < containerSize) {
            this.navOffset = navSize - containerSize
          }
        } else {
          this.scrollable = false
          if (currentOffset > 0) {
            this.navOffset = 0
          }
        }
      }
    },
    render() {
      const { navStyle, scrollable, scrollNext, scrollPrev, height } = this
      const lineHeight = {
        'line-height': height + 'px'
      }
      const scrollBtn = scrollable
        ? [
            <span
              class={['scrollView__nav-prev', scrollable.prev ? '' : 'is-disabled']}
              on-click={scrollPrev}
            >
              <i style={lineHeight} class="el-icon-arrow-left"></i>
            </span>,
            <span
              class={['scrollView__nav-next', scrollable.next ? '' : 'is-disabled']}
              on-click={scrollNext}
            >
              <i style={lineHeight} class="el-icon-arrow-right"></i>
            </span>
          ]
        : null

      return (
        <div
          class={[
            'scrollView__nav-wrap',
            scrollable ? 'is-scrollable' : '',
            `is-${this.tabPosition}`
          ]}
          style={{ width: '100%' }}
        >
          {scrollBtn}
          <div class={['scrollView__nav-scroll']} ref="navScroll">
            <div
              class={['scrollView__nav', `is-${this.tabPosition}`]}
              ref="nav"
              style={navStyle}
              role="tablist"
            >
              {this.$slots.default}
            </div>
          </div>
        </div>
      )
    }
  }
</script>

<style lang="scss">
  .scrollView__nav-wrap {
    overflow: hidden;
    margin: -1px 0;
    position: relative;
    flex: 1;
  }

  .scrollView__nav-wrap.is-scrollable {
    padding: 0 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .scrollView__nav-wrap::after {
    display: none;
  }

  .scrollView__nav-scroll {
    overflow: hidden;
  }

  .scrollView__nav {
    white-space: nowrap;
    position: relative;
    transition: transform 0.3s, -webkit-transform 0.3s;
    float: left;
    z-index: 2;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .scrollView__nav-prev {
    left: 0;
  }
  .scrollView__nav-next {
    right: 0;
  }
  .scrollView__nav-next,
  .scrollView__nav-prev {
    position: absolute;
    cursor: pointer;
    line-height: 44px;
    font-size: 20px;
    color: #909399;
    text-align: center;
    width: 30px;
    z-index: 10;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
    transition: all ease 0.2s;
    &:hover {
      background: #f2f2f2;
    }
    &:active {
      background: #ededed;
    }
  }
</style>
