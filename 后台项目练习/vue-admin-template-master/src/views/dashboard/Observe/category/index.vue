<template>
  <el-card>
    <div slot="header" class="header">
      <div class="category-header">
        <span class="category-title">销售额类别占比</span>
        <div>
          <el-radio-group v-model="value">
            <el-radio-button label="全部渠道"></el-radio-button>
            <el-radio-button label="线上"></el-radio-button>
            <el-radio-button label="门店"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="category-charts">
        <div class="charts" ref="charts"></div>
      </div>
    </div>
  </el-card>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "category",
  data() {
    return {
      value: "全部渠道",
    };
  },
  mounted() {
    let charts = echarts.init(this.$refs.charts);
    charts.setOption({
      title:{
          text:'视频',
          subtext:1048,
          top:'center',
          left:'center',

      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },

          labelLine: {
            show: true,
            length: 20,
          },
          data: [
            { value: 1048, name: "视频" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    });
    charts.on('mouseover',(params) =>{
      charts.setOption({
      title:{
          text:params.data.name,
          subtext:params.data.value,
      }
    })
});
  },
};
</script>
<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom:30px;
}

.charts {
  width: 100%;
  height: 300px;
  display:flex;
  justify-content: center;
  align-items: center;
}
.category-title {
  font-size: 20px;
}
.category-charts{
  border-top:1px solid #eee;
}
</style>
