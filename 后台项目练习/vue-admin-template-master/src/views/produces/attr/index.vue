<template>
  <div>
    <el-card style="margin: 20px 0px">
      <categorySelect @getcategoryId="getId" :show="!isshow"></categorySelect>
    </el-card>
    <el-card>
      <div v-show="isshow">
        <el-button
          :disabled="c3id == ''"
          @click="isshow = false"
          type="primary"
          icon="el-icon-plus"
          >添加属性</el-button
        >
        <el-table style="width: 100%" border :data="this.attrList">
          <el-table-column align="center" label="序号" type="index" width="80">
          </el-table-column>
          <el-table-column
            align="center"
            label="属性名称"
            prop="attrName"
            width="150"
          >
          </el-table-column>
          <el-table-column label="属性值列表" prop="prop" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0 20px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" prop="prop" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="edit(row)"
              ></el-button>
            </template>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isshow">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item label="属性名">
            <el-input
              v-model="attrInfo.attrName"
              placeholder="请输入属性名"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          :disabled="attrInfo.attrName == ''"
          type="primary"
          icon="el-icon-plus"
          @click="addattr()"
          >添加属性</el-button
        >
        <el-button @click="cancel()">取消</el-button>

        <el-table
          :data="attrInfo.attrValueList"
          border
          style="width: 100%; margin: 20px 0px"
        >
          <el-table-column
            align="center"
            type="index"
            prop="prop"
            label="序号"
            width="80"
          >
          </el-table-column>
          <el-table-column label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                :ref="$index"
                @keyup.native.enter="tolook(row)"
                @blur="tolook(row)"
                v-if="row.flag"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
              ></el-input>
              <span v-else @click="spanshow(row, $index)">{{
                row.valueName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm   @onConfirm="deleteattrname(row, $index)" :title="`确定删除属性值${row.valueName}?`"> 
                <el-button
               
                type="danger"
                icon="el-icon-delete"
                size="mini"
                slot="reference"
              ></el-button>
              </el-popconfirm>
         
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="save()" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="cancel()">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//按需引入lodash中的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  
  //自定义事件获取子组件传递的三级联动值
  //父组件自定义事件，绑定一个函数，函数参数是子组件用$emit传递过来的值，$meit的第一个参数是自定义事件的名字，第二哥参数是要传递的值
  data() {
    return {
      attrList: [],
      c1id: "",
      c2id: "",
      c3id: "",
      isshow: true,
      //收集新增属性|修改属性使用的
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [],
        categoryId: 0, //三级分类的id
        categoryLevel: 3, //因为服务器需要区分几级id
      },
    };
  },
  methods: {
    getId({ cid, level }) {
      console.log(cid, 1111111111111111);
      if (level == 1) {
        this.c1id = cid;
        this.c2id = "";
        this.c3id = "";
      } else if (level == 2) {
        this.c2id = cid;
        this.c3id = "";
      } else {
        this.c3id = cid;
        this.getAttrList();
        console.log(cid, level);
      }
    },
    async getAttrList() {
      let result = await this.$API.attr.reqattrList(
        this.c1id,
        this.c2id,
        this.c3id
      );
      if (result.code == 200) {
        this.attrList = result.data;
        console.log(result.data, 11111111111111);
      }
      console.log("获取频台属性");
    },
    edit(row) {
      this.isshow = false;
      //深拷贝（以免取消修改时，由于v-model绑定了数据返回时被篡改了）
      this.attrInfo = cloneDeep(row);
      // this.attrInfo=row;
      console.log(row,'编辑');
      //修改属性时，将相应的属性值添加上flag标记
      this.attrInfo.attrValueList.forEach(item=>{
        //这样书写试图不会跟着变化（因为flag不是响应式）;
        // item.flag=false;

        //因为vue无法探测普通的新增property，这样的数学的属性并非响应式属性（数据变化视图这边）
        this.$set(item,'flag',false);
      })
    },
    addattr() {
      console.log("addattr");
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id, //已有的属性的id
        valueName: "",
        //添加一个字段，单独控制编辑模式或查看模式
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    deleteattrname(row, $index) {

          this.attrInfo.attrValueList.splice($index, 1);
    
      console.log('点击了删除')
    },
    cancel() {
      this.isshow = true;
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [{}],
        categoryId: this.c3id, //三级分类的id
        categoryLevel: 3, //因为服务器需要区分几级id
      },
        console.log(1);
    },
    tolook(row) {
      if (row.valueName.trim() == "") {
        this.$message("输入的属性值名称不能为空");
        return;
      }
      let result = this.attrInfo.attrValueList.some((item) => {
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      if (result) {
        this.$message("输入的属性值名称不能重复");
        return;
      }
      row.flag = false;
    },
    spanshow(row, index) {
      row.flag = true,
        //等dom(各种元素加载成功)渲染完后触发里面的逻辑，
        this.$nextTick(() => {
          this.$refs[index].focus();
          console.log(this.$refs[index]);
        });
    },
   async save(){
      this.attrInfo.attrValueList.filter(item=>{
        if(item.valueName!=''){
          delete item.flag;
          return true;
        }
      })
 try{
  this.$API.attr.reqchangeattr(this.attrInfo);
  this.isshow=true;
  this.$message({type:'success',message:'保存成功'});
  //保存成功以后，需要再次获取数据，并清除表弟里的数据
  this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [{}],
        categoryId: this.c3id, //三级分类的id
        categoryLevel: 3, //因为服务器需要区分几级id
      },
 this.getAttrList();
 }catch(error){

 }
    }
  },
};
</script>

<style scoped></style>
