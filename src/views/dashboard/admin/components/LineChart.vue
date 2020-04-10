<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { getBaseDataOfChart } from '../../../../api/home'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    },
    chartDays: {
      type: Number,
      default: 7
    }
  },
  data() {
    return {
      chart: null,
      num_list: [],
      date_list: [],
      baoxian_money_list: [],
      showDays: 7
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    },
    chartDays: {
      deep: true,
      handler(val) {
        this.chartDays = val
        this.initChart()
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      getBaseDataOfChart(this.chartDays).then(res => {
        this.num_list = res.data.num_list
        this.date_list = res.data.date_list
        this.baoxian_money_list = res.data.baoxian_money_list
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.num_list, this.date_list, this.baoxian_money_list)
      })
    },
    setOptions(num_list, date_list, baoxian_money_list) {
      this.chart.setOption({
        xAxis: {
          data: date_list,
          boundaryGap: false,
          axisTick: {
            show: false
          },
          // x轴文字倾斜
          axisLabel: {
            interval: 0,
            rotate: 45, // 倾斜度 -90 至 90 默认为0
            margin: 2
          }
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 50,
            end: 100
          },
          {
            type: 'inside',
            realtime: true,
            start: 65,
            end: 85
          }
        ],
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['维修流水', '保险流水']
        },
        series: [{
          name: '维修流水', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: num_list,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }, {
          name: '保险流水',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: baoxian_money_list,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
