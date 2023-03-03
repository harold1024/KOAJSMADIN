<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
  import * as echarts from 'echarts'
  export default {
    name: 'chart',
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '600px'
      },
      height: {
        type: String,
        default: '600px'
      },
      data: {
        type: Object,
        default: {
          title: {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{
              value: 335,
              name: '直接访问'
            }, {
              value: 310,
              name: '邮件营销'
            }, {
              value: 234,
              name: '联盟广告'
            }, {
              value: 135,
              name: '视频广告'
            }, {
              value: 1548,
              name: '搜索引擎'
            }],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }
      }
    },
    mounted() {
      this.initChart()
//      this.chart = null
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      data(data1, data2) {
        if (data1) {
          this.initChart()
        }
      }
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id))
        this.chart.setOption(this.data)
      },
      update(){
        this.chart.setOption(this.data)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
