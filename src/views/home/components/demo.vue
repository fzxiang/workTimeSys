<template>
  <div class="mouse-wheel-pulldown">
    <div ref="scroll" class="pulldown-wrapper">
      <div class="pulldown-content">
        <div class="pulldown-tips">
          <div v-show="beforePullDown">
            <span>Pull Down and refresh</span>
          </div>
          <div v-show="!beforePullDown">
            <div v-show="isPullingDown">
              <span>Loading...</span>
            </div>
            <div v-show="!isPullingDown"><span>Refresh success</span></div>
          </div>
        </div>
        <ul class="pulldown-list">
          <li v-for="i of dataList" :key="i" class="pulldown-list-item">
            {{ `I am item ${i} ` }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import MouseWheel from '@better-scroll/mouse-wheel'

BScroll.use(PullDown)
BScroll.use(MouseWheel)

function generateData() {
  const BASE = 30
  const begin = BASE * STEP
  const end = BASE * (STEP + 1)
  const ret = []
  for (let i = end; i > begin; i--) {
    ret.push(i)
  }
  return ret
}

const TIME_BOUNCE = 800
const TIME_STOP = 600
const REQUEST_TIME = 1000
const THRESHOLD = 70
const STOP = 56
let STEP = 0

export default {
  data() {
    return {
      beforePullDown: true,
      isPullingDown: false,
      dataList: generateData(),
    }
  },
  mounted() {
    this.initBscroll()
  },
  methods: {
    initBscroll() {
      this.bscroll = new BScroll(this.$refs.scroll, {
        scrollY: true,
        bounceTime: TIME_BOUNCE,
        mouseWheel: true,
        pullDownRefresh: {
          threshold: THRESHOLD,
          stop: STOP,
        },
      })

      this.bscroll.on('pullingDown', this.pullingDownHandler)
      this.bscroll.on('scroll', this.scrollHandler)
      this.bscroll.on('scrollEnd', (e) => {
        console.log('scrollEnd')
      })
    },
    scrollHandler(pos) {
      console.log(pos.y)
    },
    async pullingDownHandler() {
      console.log('trigger pullDown')
      this.beforePullDown = false
      this.isPullingDown = true
      STEP += 1

      await this.requestData()

      this.isPullingDown = false
      this.finishPullDown()
    },
    async finishPullDown() {
      const stopTime = TIME_STOP
      await new Promise((resolve) => {
        setTimeout(() => {
          this.bscroll.finishPullDown()
          resolve()
        }, stopTime)
      })
      setTimeout(() => {
        this.beforePullDown = true
        this.bscroll.refresh()
      }, TIME_BOUNCE)
    },
    async requestData() {
      try {
        const newData = await this.ajaxGet(/* url */)
        this.dataList = newData.concat(this.dataList)
      } catch (err) {
        // handle err
        console.log(err)
      }
    },
    ajaxGet(/* url */) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const dataList = generateData()
          resolve(dataList)
        }, REQUEST_TIME)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.pullup {
  width: 100%;
  height: 100%;
  .pullup-wrapper {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    border: 1px solid #ccc;
  }
  .pullup-list-item {
    padding: 10px 0;
    list-style: none;
  }
  .pullup-tips {
    padding: 20px;
    text-align: center;
    color: #999;
  }
}
</style>
