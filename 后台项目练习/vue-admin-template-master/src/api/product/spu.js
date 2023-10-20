//平台属性管理模块请求文件
import request from  '@/utils/request';
//展示spu
// /admin/product/{page}/{limit}
export const reqspuList= (page,limit,category3Id) => request ({url:`/admin/product/${page}/${limit}`,method:'get',params:{ category3Id }});
//获取spu信息 /admin/product/getSpuById/{spuId}
export const reqspu=(spuId)=>request({url:`/admin/product/getSpuById/${spuId}`,method:'get'});

//获取品牌的信息/admin/product/baseTrademark/getTrademarkList
export const reqtrademarklist=()=>request({url:`/admin/product/baseTrademark/getTrademarkList`,method:'get'});
//获取spu图标的接口
export const  reqspuimagelist=(spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'});
//获取平台全部销售属性 
///admin/product/baseSaleAttrList
export  const reqbasesaleattrlist=()=>request({url:`/admin/product/baseSaleAttrList`,method:'get'});
//修改spu||添加spu  对于修改或者添加，携带给服务器参数大致一样的，唯一的区别就是携带的参数是否带id
export const reqAddOrUpdatespu = (spuInfo)=>{
    //携带的参数带有id---修改spu
    if(spuInfo.id){
        return request({url:'/admin/product/updateSpuInfo',method:'post',data:spuInfo})
    }else{
        //携带的参数不带id---添加spu
        return request({url:'/admin/product/saveSpuInfo',method:'post',data:spuInfo})
    }
}
//删除spu
export const reqDeletespu=(spuId)=>request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'});


//获取图片的接口
export const  reqspuImgList=(spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'});
//获取销售属性的接口
export const  reqspuSaleAttr=(spuId)=>request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'});
//商品基础属性接口 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const  reqAttrInfoList =(c1id,c2id,c3id)=>request({url:`/admin/product/attrInfoList/${c1id}/${c2id}/${c3id}`,method:'get'});
///admin/product/saveSkuInfo
//添加sku

// export const reqAddSku=(skuInfo)=>request({url:`/admin/product/saveSkuInfo`,method:"post",data:skuInfo});
export const reqAddSku = (skuInfo)=>request({url:'/admin/product/saveSkuInfo',method:'post',data:skuInfo});
//获取sku列表接口
export const reqSkuList =(spuId)=>request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})

