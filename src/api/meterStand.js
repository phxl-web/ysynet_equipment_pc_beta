/*计量台账 */
import {_local} from './local';
const meterStand = {
  //保养计划列表
  planList:`${_local}/maintainOrderController/selectMaintainPlanList`,//保养计划列表
  userDeptList: `${_local}/dept/queryUserDeptListByUserId`,           //使用科室列表
  mgtDeptList: `${_local}/dept/queryManagerDeptListByUserId`,         //管理科室列表
  selectUseDeptList: `${_local}/dept/selectUseDeptList`,              //添加资产使用科室列表
  addAssetMeter: `${_local}/meterRecordController/insertMeterRecord`, //添加资产计量
  meterRecordList: `${_local}/meterRecordController/meterRecordList`, //计量台账列表
  updateMeterRecord: `${_local}/meterRecordController/updateMeterRecord`, //编辑计量
  selectAssetsList: `${_local}/meterRecordController/selectAssetsList`,   //计量查询列表
  insertMeterRecordInfo: `${_local}/meterRecordController/insertMeterRecordInfo`, //完成检定
  meterRecordInfoList: `${_local}/meterRecordController/meterRecordInfoList`,     //计量查询列表
}

export default meterStand;