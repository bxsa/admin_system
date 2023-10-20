//这个模块主要获取的是品牌管理的数据模块
import request from '@/utils/request';
//获取品牌列表接口
export  const reqTradeMarkList=(page,limit)=>request({url: `/admin/product/baseTrademark/${page}/${limit}`,method:'get'})

//处理添加品牌
//新增品牌  /admin/product/baseTrademark/save   post 携带两个参数 ：品牌名称，品牌logo  

//修改品牌的接口  /admin/product/baseTrademark/update  put  携带三个参数  id,品牌名称，品牌logo。
//切记，对于新增的品牌，给服务器传递数据，不需要传递id，id是由服务器生成
export  const  reqAddOrUpdateTradeMark=(trademark)=>{
    //带给服务器携带id，表示修改  
    if(trademark.id){
        //修改品牌
        //data指带给服务器的参数
   return  request({url:'/admin/product/baseTrademark/update',method:'put',data:trademark})
      }else{
        //新增品牌
        return request({url:'/admin/product/baseTrademark/save',method:'post',data:trademark})
      }

}
//删除品牌接口  /admin/product/baseTrademark/remove/{id}  delete请求
export const reqDeleteTradeMark=(id)=>request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'});