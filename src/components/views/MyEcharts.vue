<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-button @click="pie">pie</el-button>
      </el-col>
      <el-col :span="12">
        <el-button @click="map">map</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" id="echarts" class="demo"></el-col>
      <el-col :span="12" id="map" class="demo"></el-col>
    </el-row>
  </div>

</template>
<script>
  import 'echarts/map/js/china';

  export default {
    data() {
      return {
        echarts: null,
        mapEcharts: null
      }
    },
    mounted() {
      this.drawPie();
      this.drawMap();
    },
    beforeDestroy () {
      this.echarts.clear();
      this.mapEcharts.clear();
    },
    methods: {
      drawPie() {
        this.echarts = this.$echarts.init(document.getElementById("echarts"));
        this.echarts.setOption({
          title: {
            text: '发行渠道',
            y: 10,
            x: 10
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b} <br/> {c} ({d}%)"
          },
          color: ['orange', 'blue'],
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['0%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 15,
                  length2: 30,
                  smooth: false
                }
              },
              data: []
            }
          ]
        })
      },
      drawMap() {
        this.mapEcharts = this.$echarts.init(document.getElementById("map"));
        this.mapEcharts.setOption({
          title: {
            text: '全网交易量分布'
          },
          tooltip: {
            trigger: 'item'

          },
          legend: {
            x: '100',
            y: 'bottom',
            icon: "roundRect",
            selectedMode: true
          },
          dataRange: {
            orient: 'vertical',
            min: 0,
            max: 55000,
            text: ['高', '低'],           // 文本，默认为数值文本
            splitNumber: 0
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            x: 'right',
            y: 'center',
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false}
            }
          },
          series: [
            {
              name: '交易占比（%）',
              type: 'map',
              mapType: 'china',
              mapLocation: {
                x: 'center'
              },
              selectedMode: 'multiple',
              itemStyle: {
                normal: {label: {show: true}},
                emphasis: {label: {show: true}}
              },
              data: []
            }
          ],
          animation: false
        })
      },
      pie() {
        let dataOption = {
          series: [{
            data: [{value: 335, name: '自主发行'},
              {value: 510, name: '合作银行发行'}]
          }]
        }
        this.echarts.setOption(dataOption);
      },
      map() {
        let dataOption = {
          series: [{
            data: [{name: '西藏', value: 605.83},
              {name: '青海', value: 1670.44},
              {name: '宁夏', value: 2102.21},
              {name: '海南', value: 2522.66},
              {name: '甘肃', value: 5020.37},
              {name: '贵州', value: 5701.84},
              {name: '新疆', value: 6610.05},
              {name: '云南', value: 8893.12},
              {name: '重庆', value: 10011.37},
              {name: '吉林', value: 10568.83},
              {name: '山西', value: 11237.55},
              {name: '天津', value: 11307.28},
              {name: '江西', value: 11702.82},
              {name: '广西', value: 11720.87},
              {name: '陕西', value: 12512.3},
              {name: '黑龙江', value: 12582},
              {name: '内蒙古', value: 14359.88},
              {name: '安徽', value: 15300.65},
              {name: '北京', value: 16251.93},
              {name: '福建', value: 17560.18},
              {name: '上海', value: 19195.69},
              {name: '湖北', value: 19632.26},
              {name: '湖南', value: 19669.56},
              {name: '四川', value: 21026.68},
              {name: '辽宁', value: 22226.7},
              {name: '河北', value: 24515.76},
              {name: '河南', value: 26931.03},
              {name: '浙江', value: 32318.85},
              {name: '山东', value: 45361.85},
              {name: '江苏', value: 49110.27},
              {name: '广东', value: 53210.28}]
          }]
        }
        this.mapEcharts.setOption(dataOption);
      }
    }
  }
</script>
<style>
  .demo {
    height: 500px;
  }
</style>
