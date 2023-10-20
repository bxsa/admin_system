<template>
  <div>
    <!-- inline代表行内表单，代表一行可以放置多个表单元素 -->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <!-- 一定写成v-model -->
        <el-select
          @change="handel1()"
          placeholder="请选择"
          v-model="cForm.c1name"
          :disabled="show"
        >
          <el-option
            v-for="(c1, index) in this.list1"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级级分类">
        <el-select
        :disabled="show"

          @change="handel2()"
          placeholder="请选择"
          value=""
          v-model="cForm.c2name"
        >
          <el-option
            :label="c2.name"
            v-for="(c2, index) in this.list2"
            :key="c2.id"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          @change="handel3()"
          placeholder="请选择"
          value=""
          v-model="cForm.c3name"
          :disabled="show"

        >
          <el-option
            v-for="(c3, index) in this.list3"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "categorySelect",
  props:['show'],
  data() {
    //一级分类数据
    return {
      list1: [],
      list2: [],
      list3: [],
      cForm: {
        c1name: "",
        c2name: "",
        c3name: "",
      },
    };
  },
  //组件挂载完毕，获取一级分类
  mounted() {
    this.getcategory1List();
  },
  methods: {
    async getcategory1List() {
      let result = await this.$API.attr.reqcategory1List();
      this.list1 = result.data;
      console.log(result, "一级分类数据");
      console.log(this.list1, "一级分类数据");
    },
    async getcategory2List(category1Id) {
      let result = await this.$API.attr.reqcategory2List(category1Id);
      this.list2 = result.data;
      console.log(result, "二级分类数据");
      console.log(this.list2, "list2");
    },
    async getcategory3List(category2Id) {
      let result = await this.$API.attr.reqcategory3List(category2Id);
      this.list3 = result.data;
      console.log(result, "三级分类数据");
      console.log(this.list3, "list3");
    },
    handel1() {
      //重新选择时清除数据;
      this.list2 = [];
      this.list3 = [];
      this.cForm.c2name = "";
      this.cForm.c3name = "";
      const { c1name } = this.cForm;
      this.$emit("getcategoryId", { cid: c1name, level: 1 });
      this.getcategory2List(c1name);
      console.log("一级分类数据变化");
    },
    handel2() {
      //重新选择时清除数据;
      this.list3 = [];
      this.cForm.c3name = "";
      const { c2name } = this.cForm;
      this.$emit("getcategoryId", { cid: c2name, level: 2 });
      this.getcategory3List(c2name);
      console.log("二级分类数据变化");
    },
    //三级分类的事件回调
    handel3() {
      const { c3name } = this.cForm;
      this.$emit("getcategoryId", { cid: c3name, level: 3 });
    },
  },
};
</script>
<style scoped></style>
