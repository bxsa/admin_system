<template>
  <div>
    <el-card style="margin: 20px 0px">
      <categorySelect
        @getcategoryId="getId"
        :show="scene != 0"
      ></categorySelect>
    </el-card>
    <el-card>
      <div v-show="scene == 0">
        <!-- 展示spu列表结构 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!c3id"
          @click="addspu()"
        >
          添加spu</el-button
        >
        <el-table style="width: 100%" border :data="spuList">
          <el-table-column type="index" label="序号" width="80" align="cneter">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addsku(row)"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="编辑spu"
                @click="updatespu(row)"
              ></el-button>
              <el-button
                type="info"
                icon="el-icon-time"
                size="mini"
                title="管理spu"
                @click="handle(row)"
              ></el-button>
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deletespu(row)">
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="total"
          :current-page="page"
          :page-size="limit"
          :page-sizes="[3, 5, 12]"
          @current-change="this.getspuList"
          layout="total,sizes,prev,pager,next,jumper"
          style="text-align: center"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
      <div>
        <spuform
          ref="spuform"
          v-show="scene == 1"
          @changescene="changescene"
        ></spuform>
        <skuform  @skuchangescene='skuchangescene' ref="skuform" v-show="scene == 2"></skuform>

      </div>
    </el-card>
    <el-dialog :before-close="close" :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible">
  <el-table :data="skuList" v-loading="this.loading">
    <el-table-column  prop='skuName'  label="名称" width="width"></el-table-column>
    <el-table-column prop='price'  label="价格" width="width"></el-table-column>
    <el-table-column  prop='weight'  label="重量" width="width"></el-table-column>
    <el-table-column label="默认图片" width="width">
      <template slot-scope="{row,$index}">
            <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
      </template>

    </el-table-column>

  </el-table>
</el-dialog>
  </div>
</template>

<script>
import spuform from "./spuform";
import skuform from "./skufrom";
export default {
  name: "spu",
  data() {
    return {
      show: true,
      c1id: "",
      c2id: "",
      c3id: "",
      page: 1, //分页器第几页
      limit: 3, //每一页需要展示多少条数据
      spuList: [], //spu列表的数据
      total: 0, //总的数据条数
      scene: 0, //0表示展示spu列表数据  1 添加|修改spu   2 添加sku
      dialogTableVisible:false,
      skuList:[1,23,3],
      spu:{},
      skuList:[],//存储sku列表的数据
      loading:true,//弹出对话框显示加载效果
    };
  },
  components: {
    spuform,
    skuform,
  },
  methods: {
    // //点击分页器的第几页按钮的回调
    // handleCurentpage(page){
    //       this.page=page;
    //       this.getspuList();
    // },

    //某一页展示数据的条数发生变化时的回调
    handleSizeChange(limit) {
      console.log(limit);
      //条数变化就重新获取参数发亲求
      this.limit = limit;
      this.getspuList();
    },

    getId({ cid, level }) {
      //cid获取到一二三级分类的id，level是为了区分几级id
      if (level == 1) {
        this.c1id = cid;
        this.c2id = "";
        this.c3id = "";
      } else if (level == 2) {
        this.c2id = cid;
        this.c3id = "";
      } else {
        this.c3id = cid;
        console.log(this.c3id);
        this.getspuList();
      }
    },
    //获取spu列表数据的方法
    async getspuList(pages = 1) {
      this.page = pages;
      const { page, limit, c3id } = this;
      //携带三个参数:page 第几页  limit 每一页需要展示多少条数据  三级分类id
      let result = await this.$API.spu.reqspuList(page, limit, c3id);
      if (result.code == 200) {
        this.total = result.data.total;
        this.spuList = result.data.records;
        console.log(result.data);
        this.total = result.data.total;
      }
    },
    //添加spu按钮的回调
    addspu() {
      //转到场景1，添加spu的场景
      this.scene = 1;
      //通知子组件spuform发请求
      this.$refs.spuform.addspuData(this.c3id);
    },
    //修改spu
    updatespu(row) {
      this.scene = 1;
      this.$refs.spuform.initspudata(row);
    },
    changescene({ scene, flag }) {
      this.scene = scene;
      console.log(scene);
      //修改完跳回场景0时应该重新获取spu数据展示修改后的数据
      if (flag == "修改") {
        this.getspuList(this.page);
        console.log(this.spuList,'spilist');
      } else {
        //不传参数默认为第一页
        this.getspuList();
        console.log(this.spuList,'spilist');
      }
    },
    //删除spu的回调
   async deletespu(row) {
      await this.$API.spu.reqDeletespu(row.id);
      console.log(this.spuList);
      //删除完成后，重新获取spu数据
      this.getspuList(this.spuList.length>1?this.page:this.page-1);
      this.$message({type:'success',message:'删除成功'});
    },
    //添加sku
    addsku(row){
      console.log(row.spuName)
      //切换场景为2
      this.scene=2;
      this.$refs.skuform.getData(this.c1id,this.c2id,row);
    },
   //
   skuchangescene(scene){
    this.scene=scene;
  },
 async handle(spu){
    this.dialogTableVisible=true;
    //获取spu的信息
    this.spu=spu;
    //获取sku数据展示
       let  result=await this.$API.spu.reqSkuList(spu.id);
       if(result.code==200){
        this.skuList=result.data;
        this.loading=false;
       }
         console.log(result,'skulist');
  },
  close(done){
    this.loading=true;
    //清除sku列表的数据
    this.skuList=[];
    //关闭对话框
    done();
  }
  },
 
};
</script>

<style scoped></style>
