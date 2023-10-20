<template>
  <div>
    <!-- 按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="showdialog"
      >添加</el-button
    >
    <!-- 对话框 
:visible.sync是控制对话框显示和隐藏用/的
-->
    <el-dialog
      :title="this.tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- form表单：model属性,这个属性的作用是把表单的数据收集到那个对象上，将来表单验证，也需要这个属性 -->
      <el-form style="width: 80%" :model="tmForm" ref="ruleForm" :rules="rules">
        <el-form-item label="品牌名称" prop="tmName" label-width="100px">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <!-- 品牌logo不能使用v-model收集数据，因为这里不是表单元素 -->
        <el-form-item label="品牌LOGO" prop="logoUrl" label-width="100px">
          <!-- 上传组件框 el-upload 
         :on-success="handleAvatarSuccess" 图片上传成功的回调
          :before-upload="beforeAvatarUpload"   图片上传之前的回调-->
          <!-- action设置图片上传的地址 -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addorupdatetrademark()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!--  表格组件  
      data:表格组件将来需要显示的数据--数据类型 
      border:给表格添加边框
      label:显示标题
      width：对应列的宽度
      align:标题的对齐方式
       -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column
        align="center"
        prop="prop"
        label="序号"
        width="80px"
        type="index"
      >
      </el-table-column>
      <!-- prop后面接收改列要显示的字段名 -->
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
      ></el-table-column>

      <el-table-column label="品牌logo" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            @click="updateTrademark(row)"
            icon="el-icon-edit"
            size="mini"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器
    current-page:代表第几页
    total数据总条数
    page-size每页展示的数据条数
    -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :total="total"
      :current-page="
        Number.isInteger(this.total / this.limit) ? page : page + 1
      "
      :page-size="limit"
      @size-change="changerow"
      @current-change="handechange"
      :page-sizes="[2, 3, 5, 10]"
      layout="prev,pager,next,jumper,->,sizes,total"
    >
    </el-pagination>
    <!-- layout="->,total,sizes,pager,jumper,prev" -->
    <!-- 里面->的作用是把后面两个配置顶到左右边 -->
    <!-- @current-change是用来获取第几页的 -->
    <!-- @size-change 获取每页的条数-->
  </div>
</template>
<script>
export default {
  name: "Attr",
  data() {
    return {
      page: 3,
      limit: 2,
      total: 0,
      list: [],
      //让对话框不显示,false;
      dialogFormVisible: false,

      //收集表单框里的数据,收集的品牌信息对象身上的属性不能瞎写，需要看文档
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      //表单验证规则
      rules: {
        tmName: [
          //required是设置该字段必须进行校验，且旁边会出现红色五角星
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        logoUrl: [
          { required: true, message: "请选择品牌图片", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    //获取品牌列表的数据,给一个默认参数表示没有传入pager参数显示第一列页
    async getPageList(pager = 1) {
      this.page = pager;
      console.log(this.page, "页数page");
      //结构出参数
      let { page, limit } = this;
      console.log(page, "page");
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        //展示数据的总条数与列表展示的数据
        console.log(result.data, "品牌管理");
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    //获取点击的页码
    handechange(pager) {
      //将获取点击的页码赋值给page，然后接着重新发请求
      this.page = pager;
      this.getPageList(pager);
      console.log(`当前页码数${pager}`);
    },
    changerow(limit) {
      this.limit = limit;
      console.log(`每页展示多少条数据${limit}`);
      this.getPageList();
    },
    showdialog() {
      this.dialogFormVisible = true;
      this.tmForm = {
        tmName: "",
        logoUrl: "",
      };
    },
    updateTrademark(row) {
      this.dialogFormVisible = true;
      //这里得使用浅拷贝，以免直接修改原来的数据导致页面变化
      this.tmForm = { ...row };
      console.log(row, "row");
    },
    //图片上传成功
    handleAvatarSuccess(res, file) {
      //res：上传成功之后返回前端数据
      //file:上传成功之后服务器返回前端数据
      console.log(res, "图片上传这里");
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.tmForm.logoUrl = res.data;
   
    },
    //图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //添加或修改品牌
    addorupdatetrademark() {
      this.$refs.ruleForm.validate(async (success) => {
        console.log(success, "表单验证里的");
        if (success) {
          //点击确定按钮，上传模块隐藏
          this.dialogFormVisible = false;
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(
            this.tmForm
          );
          if (result.code == 200) {
            //弹出信息：添加品牌成功，修改品牌成功
            console.log(this.tmForm.id, "id");
            this.$message({
              type: "success",
              message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
            });
            //添加或修改完后重新发请求渲染新的数据；
            this.getPageList(
              this.tmForm.id
                ? this.page
                : Math.ceil((this.total + 1) / this.limit)
            );
          }
        } else {
          console.log("上传失败  error submit!");
          return false;
        }
      });
    },
    //删除品牌
    deleteTradeMark(row) {
      this.$confirm(`你确定删除${row.tmName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          console.log(row.id, this.page, "row删除,page");
          let result=  await  this.$API.trademark.reqDeleteTradeMark(row.id);
        if(result.code==200){
          console.log('删除if');
          this.$message({
            type: "success",
            message: "删除成功",
          });
        this.getPageList(Number.isInteger(this.total / this.limit)?this.page:this.page-1 );
        }
        
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },
  },
};
</script>
<!-- 加了scope就没边框了 -->
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #06131f;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
