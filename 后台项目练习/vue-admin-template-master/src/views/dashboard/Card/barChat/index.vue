<template>
    <div class="charts" ref="charts"></div>
  </template>
  <script>
  import * as echarts from "echarts";
  export default {
    name: "barChat",
    mounted() {
      //初始化echarts实例
      let lineCharts = echarts.init(this.$refs.charts);
      lineCharts.setOption({
        xAxis: {
          //隐藏x轴
          show: false,
          type: "category", //
        },
        yAxis: {
          //隐藏y轴
          show: false,
        },
        //系列
       series:[
              {
                type:'bar',
                data:[10,23,33,22,44,25,22,55,69],
                color:"orange",
              }
       ],
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        },
        tooltip:{}
      });
    },
  };
  </script>
  <style scoped>
  .charts {
    width: 100%;
    height: 100%;
  }
  </style>
  