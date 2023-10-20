<template>
  <el-card class="bor-card" style="margin: 10px 0px">
    <div slot="header" class="clearfix">
      <!-- v-model="activeName" @tab-click="handleClick" -->
      <!-- v-model="activeName" @tab-click="handleClick" -->
      <el-tabs class="tab" v-model="activeName"  >
        <el-tab-pane label="销售额" name="sale">用户管理</el-tab-pane>
        <el-tab-pane label="访问量" name="visite">配置管理</el-tab-pane>
      </el-tabs>
      <div class="right">
        <span @click="setDay()">今日</span>
        <span @click="setWeek()">本周</span>
        <span @click="setMounth()">本月</span>
        <span @click="setYear()">本年</span>
        <el-date-picker
          class="date"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          value-format="yyyy-MM-dd"
          v-model="date"
        >
        </el-date-picker>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <!-- 容器 -->
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="6">
        <h3>门店{{ title }}排名</h3>
        <ul>
          <li>
          '  <span class="rindex">1</span>
            <span>肯德基</span>
            <span  class="rvalue">123412</span>'
          </li>
          <li>
            <span class="rindex">2</span>
            <span>肯德基</span>
            <span  class="rvalue">123412</span>
          </li>
          <li>
            <span class="rindex">3</span>
            <span>肯德基</span>
            <span  class="rvalue">123412</span>
          </li>
          <li>
            <span class="rindex">4</span>
            <span>肯德基</span>
            <span  class="rvalue">123412</span>
          </li>
          <li>
            <span >5</span>
            <span>肯德基</span>
            <span  class="rvalue">123412</span>
          </li>
          <li>
            <span>6</span>
            <span>肯德基</span>
            <span  class="rvalue">123412</span>
          </li>
          <li>
            <span >7</span>
            <span>肯德基</span>
            <span   class="rvalue">123412</span>
          </li>
        </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>
<script>
import { title } from "@/settings";
import * as echarts from "echarts";
import dayjs from 'dayjs';
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale",
      myCharts:null,
      date:[],//收集日历数据
    };
  },
  mounted() {
    //初始化echarts实例
   this.myCharts = echarts.init(this.$refs.charts);
    this.myCharts.setOption({
      title:{
            text:this.title+'趋势',
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月",'八月','九月','十月','十一月','十二月'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [20, 52,200,232,444,352,379,232,123,219,180,240],
          color:'yellowgreen'
        },
      ],
    });
  },
  methods:{
    setDay(){
console.log('day')
const day=dayjs().format('YYYY-MM-DD');
this.date=[day,day];
console.log(day);

    },
    setWeek(){
      console.log('week');
      const start=dayjs().day(1).format('YYYY-MM-DD');
      const end=dayjs().day(7).format('YYYY-MM-DD');
      this.date=[start,end];
console.log(start,end);
    },
    setMounth(){
      console.log('mounth');
      const start=dayjs().startOf('month').format('YYYY-MM-DD');
      const end =dayjs().endOf('month').format('YYYY-MM-DD');
      this.date=[start,end];
console.log(start,end);

    },
    setYear(){
      console.log('year');
      const start=dayjs().startOf('year').format('YYYY-MM-DD');
      const end =dayjs().endOf('year').format('YYYY-MM-DD');
      this.date=[start,end];
console.log(start,end);
    },
  },
  computed:{
     title(){
      return this.activeName=='sale'?'销售额':'访问量';
  }},
  watch:{
    title(){
      console.log(123);
      this.myCharts.setOption({
        title:{
            text:this.title+'趋势',
      },
      })
    },
  }
};
</script>
<style scoped>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0px;
}
.date {
  width: 250px;
  margin: 0px 20px;
}
.right span {
  margin: 0px 20px;
}
.charts{
  width: 100%;
  height: 300px;
}
ul{
  width:100%;
  height:300px;
  list-style: none;
  padding:0px;
}
ul li {
  height:8%;
  margin:10px;
}
ul li span{
  margin-left:20px;
}
.rindex{
  float:left;
  width:20px;
  height:20px;
  border-radius: 50%;
  background:black;
  color:#fff;
  text-align:center;
  line-height:20px;
}
.rvalue{
  float:right;
}
</style>
