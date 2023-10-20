<template>
  <el-card>
    <div slot="header" class="bodersize">
      <div class="header">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item >双皮奶</el-dropdown-item>
            <el-dropdown-item >蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="12">
          <linechartone></linechartone>
        </el-col>
        <el-col :span="12">
          <linecharttwo></linecharttwo>
        </el-col>
      </el-row>
    </div>
    <el-table
    :data="tableData"
    style="width: 100%"
    
    border
    >
    <el-table-column
      prop="date"
      label="排名"
      type="index"
      width="80">
    </el-table-column>
    <el-table-column
      prop="name"
      label="搜索关键字"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="用户数"
      sortable
   >
    </el-table-column>
    <el-table-column
      prop="address"
      label="周涨幅"
      sortable
   >
    </el-table-column>
  </el-table>

  <div class="block">
  <el-pagination
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
</div>
  </el-card>
</template>
<script>
import linechartone from "./linechartone";
import linecharttwo from "./linecharttwo";

export default {
  name: "search",
  data(){
    return{
      tableDta:'',
    }
  },
  components: {
    linecharttwo,
    linechartone,
  },
};
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.bodersize {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}
.block{
  float:right;
}
</style>
