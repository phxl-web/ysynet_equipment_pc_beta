import {_local} from './local';
export default {
 userLogin: `${_local}/login/userLogin`,//登录
 picUploadUrl: `${_local}/ftp/post`,//图片上传
 YSYPATH:`${_local}/ftp`,//项目地址
 selectAssetsList: `${_local}/assetsRecordController/selectAssetsList`, //查询资产列表
 selectAssetsRecordDetail: `${_local}/assetsRecordController/selectAssetsRecordDetail`, // 根据资产档案GUID查询资产详情 
 updateAssetsRecordInfo: `${_local}/assetsRecordController/updateAssetsRecordInfo`, // 修改资产档案信息 
 selectAssetsExtendList: `${_local}/assetsRecordController/selectAssetsExtendList`, // 根据资产档案GUID查询资产配件信息 
 deleteAssetsExtend: `${_local}/assetsRecordController/deleteAssetsExtend`, //  删除附件信息
 searchCertList: `${_local}/equipmentAdd/searchCertList`, // 根据资产 证件GUID 查询证件信息
 selectCertInfoList: `${_local}/assetsRecordController/selectCertInfoList`, // 根据资产编号assetsRecord 查询资产附件列表
 selectEqOperationInfoList: `${_local}/assetsRecordController/selectEqOperationInfoList`, // 根据资产GUID 查询资产档案操作记录列表
 importEquipments: `${_local}/equipmentAdd/importEquipments`, // 资产信息导入
 assetsFileUpLoad: `${_local}/assetsRecordController/assetsFileUpLoad`, // 资产附件上传
 deleteAssetsFile: `${_local}/assetsRecordController/deleteAssetsFile`, // 删除资产附件信息
 printEquipmentQrcode: `${_local}/equipmentAdd/printEquipmentQrcode`, // 打码

 //报修登记
 insertOrUpdateRrpair: `${_local}/rrpairOrderController/insertOrUpdateRrpair`,
 selectRrpairFittingList: `${_local}/rrpairOrderController/selectRrpairFittingList`, //查询维修配件使用列表
 insertRrpairFitting: `${_local}/rrpairOrderController/insertRrpairFitting`, //资产列表添加维修附件信息
 insertRrpairExtend: `${_local}/rrpairOrderController/insertRrpairExtend`, //手动添加维修附件信息
 deleteRrpairFitting: `${_local}/rrpairOrderController/deleteRrpairFitting`, //删除当前维修配件
 //指派维修提交
 designateInOrOut: `${_local}/rrpairOrderController/designateInOrOut`,


 //维修记录
 selectRrpairList: `${_local}/rrpairOrderController/selectRrpairList`, //查询设备维修列表
 selectRrpairDetailList: `${_local}/rrpairOrderController/selectRrpairDetailList`, //查询设备维修详情列表
 selectEqOperationList: `${_local}/rrpairOrderController/selectEqOperationList`, //维修单详情操作记录
 updateRrpairOrderFstate: `${_local}/rrpairOrderController/updateRrpairOrderFstate`, //维修工单状态扭转

 //验收
 insertRrpairOrderAcce: `${_local}/rrpairOrderController/insertRrpairOrderAcce`, //验收维修单

};