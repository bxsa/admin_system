//平台属性管理模块请求文件
import request from  '@/utils/request';
//获取一级分类的数据接口
export const  reqcategory1List=()=>request({url:'/admin/product/getCategory1',method:'get'});
//获取二级分类数据接口
export const reqcategory2List=(category1Id)=>request({url:`/admin/product/getCategory2/${category1Id}`,method:'get'});

//获取三级分类数据接口

export  const reqcategory3List=(category2Id)=>request({url:`/admin/product/getCategory3/${category2Id}`,method:'get'});
//获取平台属性的接口
export const reqattrList=(category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'});
//添加属性与属性值接口 /admin/product/saveAttrInfo  post
export  const reqAddAttr=(data)=>request({url:`/admin/product/addAttrInfo`,method:'post',data})
//属性修改接口 /admin/product/saveAttrInfo
export const  reqchangeattr=(data)=>request({url:`/admin/product/saveAttrInfo`,method:'post',data});
