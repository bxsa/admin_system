<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
     
        <search></search>
     
      </el-col>
      <el-col :span="12">
        <category></category>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import category from "./category";
import search from "./search";
export default {
  name: "Observe",
  components: {
    category,
    search,
  },
};
</script>
<style scoped></style>
