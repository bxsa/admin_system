<template>

  <el-form ref="form" label-width="80px" :model="spu">
    <el-form-item label="spu名称">
      <el-input placeholder="spu名称" v-model="spu.spuName"> </el-input>
    </el-form-item>
    <el-form-item label="品牌">
      <el-select placeholder="请选择品牌" value="" v-model="spu.tmId">
        <el-option
          :label="tm.tmName"
          :value="tm.id"
          v-for="(tm, index) in trademarklist"
          :key="tm.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="spu描述">
      <el-input
        type="textarea"
        rows="4"
        placeholder="描述"
        v-model="spu.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="spu图片">
      <el-upload
        action="/dev-api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="spuimagelist"
        :on-success="handlerSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-select :placeholder="`还有${unselectsaleattr.length}未选择`"  v-model="attrId" value="">
        <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="(unselect,index) in unselectsaleattr" :key="unselect.id"></el-option>
      </el-select>
      <el-button :disabled="!attrId" type="primary" icon="el-icon-plus" @click="addSaleAttr"> 添加销售属性 </el-button>
      <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
        <el-table-column align="center" type="index" label="序号" width="80px">
        </el-table-column>
        <el-table-column prop="saleAttrName" label="属性名" width="width">
        </el-table-column>
        <el-table-column prop="prop" label="属性值名称列表" width="width">
          <template slot-scope="{ row, $index }">
            <!-- @close="handleClose(tag)" -->
            <el-tag
              
              v-for="tag in row.spuSaleAttrValueList"
              closable
              :disable-transitions="false"
              @close="handleClose(tag,row)"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <!--     @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm" -->
            <el-input
              class="input-new-tag"
              v-if="row.inputVisible"
              v-model="row.inputValue"
              ref="saveTagInput"
              size="small"
              @blur="handleInputConfirm(row)"
          
            >
            </el-input>
            <!-- 
              @click="showInput"

             -->
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click='addSaleAttrvalue(row)'
              >添加</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width">
          <template slot-scope="{row,$index}">
               <el-button  @click="spu.spuSaleAttrList.splice($index,1)" type="danger" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addOrUpdata()">保存</el-button>
      <el-button @click="cancel()">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "spuform",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      //tag标签
      dynamicTags: ['标签一', '标签二', '标签三'],
      spu: {
        //三级分类的id
        category3Id: 0,
        //描述
        description: "",
        //spu名称
        spuName: "",
        //平台的id
        tmId: '',
        //收集spu图片的信息
        spuImageList: [
          {
            id: 0,
            imgName: "",
            imgUrl: "",
            spuId: 0,
          },
        ],
        //平台属性与属性值收集
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "",
                saleAttrName: "",
                saleAttrValueName: "",
                spuId: 0,
              },
            ],
          },
        ],
      }, //存储spu数据属性
      trademarklist: [], //存储品牌信息
      spuimagelist: [], //存储spu图片的数据
      saleresult: [], //获取平台全部的销售属性
      attrId:'',//收集未选择的销售属性的id
    };

  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.spuimagelist=fileList;
      console.log(this.spuimagelist,this.spu.spuImageList,'区分照片墙数据收集的地方')
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      console.log(file.url,'file.url');
      this.dialogVisible = true;
    },
    //初始化spuform数据
    async initspudata(spu) {
      //获取spu信息的数据
      let spuresult = await this.$API.spu.reqspu(spu.id);
      if (spuresult.code == 200) {
        this.spu = spuresult.data;
      }
      //获取spu图片的数据
      let spuimageresult = await this.$API.spu.reqspuimagelist(spu.id);
      if (spuimageresult.code == 200) {
        console.log(spuimageresult, "spuimageresult");
        this.spuimageresult = spuimageresult.data;
        let listArr = spuimageresult.data;
        listArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        //整理好的数据赋值给spuimagelist
        this.spuimagelist = listArr;
      }
      //获取品牌的信息
      let trademarkresult = await this.$API.spu.reqtrademarklist();
      if (trademarkresult.code == 200) {
        this.trademarklist = trademarkresult.data;
        console.log(trademarkresult, "trademarkresult");
      }
      //获取平台全部的销售属性
      let saleresult = await this.$API.spu.reqbasesaleattrlist();
      if (saleresult.code == 200) {
        this.saleresult = saleresult.data;
        console.log(saleresult, "saleresult");
        console.log(this.spu,'spu');
      }
    },
    //照片墙图片上传成功的回调
    handlerSuccess(response,file,fileList){
          //收集图片的信息
          this.spuimagelist=fileList;
    },
    //添加新的销售属性
    addSaleAttr(){
           const [baseSaleAttrId,saleAttrName]=this.attrId.split(':');
           let newSaleAttr={baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]};
           this.spu.spuSaleAttrList.push(newSaleAttr);
           this.attrId='';
    },
    //添加新的属性值
    addSaleAttrvalue(row){
      //使inputVisible这个属性值变成响应式
      this.$set(row,'inputVisible',true);
      //通过响应式数据inputValue字段收集新增的销售属性值
      this.$set(row,'inputValue','');
    },
    //el-input失去焦点的事件
    handleInputConfirm(row){
      //解构出销售属性值的名称不能为空
      console.log(row.inputVisible,'inputVisible');
      const {baseSaleAttrId,inputValue}=row;
      //新增的销售属性值的名称不能为空
      if(inputValue.trim()==''){
        this.$message('属性值不能为空');
          return;
      }
      //属性值不能重复
      let result = row.spuSaleAttrValueList.every( (item)=>{return item.saleAttrValueName!=inputValue})
       if(!result) return
       //新增的销售属性值ss
       let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };
            row.spuSaleAttrValueList.push(newSaleAttrValue);
            //修改inputVisible为false，不会就显示button
             row.inputVisible=false;
    },
    //关闭tag标签
    handleClose(tag,row){
      console.log(tag,row);
    for(let i=0;i<row.spuSaleAttrValueList.length;i++){
      if(row.spuSaleAttrValueList[i]==tag){
      console.log(i);
      row.spuSaleAttrValueList.splice(i, 1);
      }
    }
    },
    //保存（添加或修改spu）
   async addOrUpdata(){
       this.spuimagelist.map((item)=>{
          return{
            imageName:item.name,
            imageUrl:(item.response && item.response.data) || item.url,
          };
       })
       //发请求
       let result = await this.$API.spu.reqAddOrUpdatespu(this.spu);
       if(result.code==200){
        this.$message({type:'success',message:'保存成功'});
         //通知父组件回到场景0
        this.$emit('changescene',{scene:0,flag:this.spu.id?'修改':'添加',});
       }
      
       //清除数据
      Object.assign(this._data,this.$options.data());

    },
    //父组件点击了添加spu，发请求获取数据回调
  async  addspuData(c3id){
           console.log('添加');
         //添加spu时收集三级分类的id
              //添加SPU的时候收集三级分类的id
             this.spu.category3Id = c3id;
      //获取品牌的信息
           let trademarkresult = await this.$API.spu.reqtrademarklist();
      if (trademarkresult.code == 200) {
        this.trademarklist = trademarkresult.data;
        console.log(trademarkresult, "trademarkresult");
      }
      //获取平台全部的销售属性
      let saleresult = await this.$API.spu.reqbasesaleattrlist();
      if (saleresult.code == 200) {
        this.saleresult = saleresult.data;
        console.log(saleresult, "saleresult");
        console.log(this.spu,'spu');
      }
    },
    //取消按钮回调
    cancel(){
      this.$emit('changescene',{scene:0,flag:''});
      //清空数据
      Object.assign(this._data,this.$options.data());
    },
  
  },
  computed:{
    unselectsaleattr(){
      // return '二哈';
     let result =  this.saleresult.filter( (item)=>{
        return this.spu.spuSaleAttrList.every( (item1)=>{
          return item.name!=item1.saleAttrName;
        })
      })
      return result;
      
    }
  }
};
</script>
<style scoped></style>
