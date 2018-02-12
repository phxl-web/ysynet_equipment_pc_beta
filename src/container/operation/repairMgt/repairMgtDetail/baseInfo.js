/**
 * 档案管理-资产档案-详情-基本信息-资产信息
 * assetsRecordGuid={this.BaseInfoInfoData.assetsRecordGuid}
 */
import React, { Component } from 'react';
import { Row, Col,Collapse,Tabs ,Layout} from 'antd';
import styles from '../../../ledger/archivesMgt/ledgerArchives/style.css';
import AssetParts from './assetParts';//资产配件
import { selectOption,repairData,faultDescribeData } from '../../../../constants';
const { Content } = Layout;
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

class BaseInfo extends Component {
  handlefaultDescribeData = (text) => {
    let str = '';
    if(text){
      text.map((item) => {
        return  str += faultDescribeData[item] ? faultDescribeData[item].text + "," : '' 
       }) 
    }
    return str ;
  }
  render () {
    const { BaseInfoInfoData } = this.props;
    return (
      <Content className='ysynet-content ysynet-common-bgColor'>
      <Collapse defaultActiveKey={['1']}>
      <Panel header="维修单" key="1">
        <Row type="flex"   className={styles['table-row']}>
          <Col span={4} className={styles['table-span']}>维修单号</Col>
           <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.rrpairOrderNo }</Col> 
          <Col span={4} className={styles['table-span']}>单据状态</Col>
          <Col span={8} className={styles['table-span']}>{ repairData[BaseInfoInfoData.orderFstate].text } </Col>
          <Col span={4} className={styles['table-span']}>制单时间</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.createDate }</Col>
          <Col span={4} className={styles['table-span']}>完成时间</Col>
          <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.rrpairDate }</Col>
        </Row>
      </Panel>
    </Collapse>
     <Tabs defaultActiveKey="1">
     <TabPane tab="报修信息" key="1">
       <Row type="flex"  className={styles['table-row']}>
         <Col span={4} className={styles['table-span']}>资产编号</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.assetsRecord }</Col>
         <Col span={4} className={styles['table-span']}>资产名称</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.equipmentStandardName }</Col>
         <Col span={4} className={styles['table-span']}>型号</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.spec }</Col>
         <Col span={4} className={styles['table-span']}>规格</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.fmodel }</Col>
         <Col span={4} className={styles['table-span']}>资产类别</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.productType ===  "01" ? "医疗设备" : "其他"  }</Col>
         <Col span={4} className={styles['table-span']}>使用科室</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.deptName }</Col>
         <Col span={4} className={styles['table-span']}>保管员</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.custodian }</Col>
         <Col span={4} className={styles['table-span']}>管理科室</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.bDept }</Col>
         <Col span={4} className={styles['table-span']}>存放地址</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.deposit }</Col>
         <Col span={4} className={styles['table-span']}>报修来源</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.orderType }</Col>
         <Col span={4} className={styles['table-span']}>紧急度</Col>
         <Col span={8} className={styles['table-span']}>{ selectOption.urgentFlag.map((item,ind)=>item.value===BaseInfoInfoData.urgentFlag?item.text:'')}</Col>
         <Col span={4} className={styles['table-span']}>有无备用</Col>
         <Col span={8} className={styles['table-span']}>{ selectOption.spare.map((item,ind)=>item.value===BaseInfoInfoData.spare?item.text:'')}</Col >
         <Col span={4} className={styles['table-span']}>是否在保</Col>
         <Col span={8} className={styles['table-span']}>{ selectOption.guaranteeFlag.map((item,ind)=>item.value===BaseInfoInfoData.guaranteeFlag?item.text:'')}</Col>
         <Col span={4} className={styles['table-span']}>是否送修</Col>
         <Col span={8} className={styles['table-span']}>{ selectOption.rrpairSend.map((item,ind)=>item.value===BaseInfoInfoData.rrpairSend?item.text:'')}</Col>
         <Col span={4} className={styles['table-span']}>报修部门</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.deptName }</Col>
         <Col span={4} className={styles['table-span']}>报修时间</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.createDate }</Col>
         <Col span={4} className={styles['table-span']}>报修人</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.rrpairUsername }</Col>
         <Col span={4} className={styles['table-span']}>联系电话</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.rrpairPhone }</Col>
         <Col span={4} className={styles['table-span']}>故障现象</Col>
         <Col span={8} className={styles['table-span']}>{ this.handlefaultDescribeData(BaseInfoInfoData.faultDescribe) }</Col>
         <Col span={4} className={styles['table-span']}>是否停用</Col>
         <Col span={8} className={styles['table-span']}>{ selectOption.useFstate.map((item,ind)=>item.value===BaseInfoInfoData.useFstate?item.text:'') }</Col>
         <Col span={4} className={styles['table-span']}>故障描述</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.faultWords }</Col>
         <Col span={4} className={styles['table-span']}>报修备注</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.tfRemarkBx }</Col>
         <Col span={4} className={styles['table-span']}>附件</Col>
         <Col span={8} className={styles['table-span']}>{ 
           BaseInfoInfoData.faultAccessory ?<div><a href={BaseInfoInfoData.faultAccessory}>附件1</a></div>
            :
            "无" }
          </Col>
          <Col span={4} className={styles['table-span']}></Col>
          <Col span={8} className={styles['table-span']}></Col>
       </Row>
     </TabPane>
     <TabPane tab="指派信息" key="2">
       <Row type="flex"  className={styles['table-row']}>
         <Col span={4} className={styles['table-span']}>维修方式</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.rrpairType === '00'?'内修':'外修' }</Col>
         <Col span={4} className={styles['table-span']}>指派服务商</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.outOrg }</Col>
         <Col span={4} className={styles['table-span']}>指派人</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.outOrg }</Col>
         <Col span={4} className={styles['table-span']}>指派时间</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.callTime }</Col>
         <Col span={4} className={styles['table-span']}>预计开始时间</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.callTime }</Col>
         <Col span={4} className={styles['table-span']}>期望完成时间</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.completTime }</Col>
         <Col span={4} className={styles['table-span']}>指派备注</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.tfRemarkZp }</Col>
         <Col span={4} className={styles['table-span']}></Col>
         <Col span={8} className={styles['table-span']}></Col>
       </Row>
     </TabPane>
     <TabPane tab="维修信息" key="3">
         {
          BaseInfoInfoData.repairResult === "02"?
             <Row type="flex"   className={styles['table-row']}>
              <Col span={4} className={styles['table-span']}>维修人</Col>
              <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.rrpairType === "00" ? BaseInfoInfoData.inRrpairUsername : BaseInfoInfoData.outRrpairUsername }</Col>
              <Col span={4} className={styles['table-span']}>联系电话</Col>
              <Col span={8} className={styles['table-span']}>{  BaseInfoInfoData.rrpairType === "00" ? BaseInfoInfoData.inRrpairPhone : BaseInfoInfoData.outRrpairPhone  }</Col>
              <Col span={4} className={styles['table-span']}>维修单位</Col>
              <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.outOrg }</Col>
              <Col span={4} className={styles['table-span']}>维修时间</Col>
              <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.createDate }</Col>  
              <Col span={4} className={styles['table-span']}>故障类型</Col>
              <Col span={8} className={styles['table-span']}> { selectOption.repairContentType.map((item,ind)=>item.value===BaseInfoInfoData.repairContentType?item.text:'')}</Col>
              <Col span={4} className={styles['table-span']}>故障原因</Col>
              <Col span={8} className={styles['table-span']}>{ selectOption.repairContentTyp.map((item,ind)=>item.value===BaseInfoInfoData.repairContentTyp?item.text:'')}</Col>
              <Col span={4} className={styles['table-span']}>维修结果</Col>
              <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.repairResult }</Col>
              <Col span={4} className={styles['table-span']}>维修费用（总计）</Col>
              <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.actualPrice }</Col>
              <Col span={4} className={styles['table-span']}>关闭原因</Col>
              <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.offCause }</Col>
              <Col span={4} className={styles['table-span']}>后续处理</Col>
              <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.followupTreatment }</Col>
              <Col span={4} className={styles['table-span']}>关闭备注</Col>
              <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.tfRemarkGb }</Col>
              <Col span={4} className={styles['table-span']}></Col>
              <Col span={8} className={styles['table-span']}></Col>
            </Row>
              :
             <Row type="flex"   className={styles['table-row']}>
              <Col span={4} className={styles['table-span']}>维修人</Col>
              <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.rrpairType === "00" ? BaseInfoInfoData.inRrpairUsername : BaseInfoInfoData.outRrpairUsername }</Col>
              <Col span={4} className={styles['table-span']}>联系电话</Col>
              <Col span={8} className={styles['table-span']}>{  BaseInfoInfoData.rrpairType === "00" ? BaseInfoInfoData.inRrpairPhone : BaseInfoInfoData.outRrpairPhone  }</Col>
              <Col span={4} className={styles['table-span']}>维修单位</Col>
              <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.outOrg }</Col>
              <Col span={4} className={styles['table-span']}>维修时间</Col>
              <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.createDate }</Col>  
              <Col span={4} className={styles['table-span']}>故障类型</Col>
              <Col span={8} className={styles['table-span']}> { selectOption.repairContentType.map((item,ind)=>item.value===BaseInfoInfoData.repairContentType?item.text:'')}</Col>
              <Col span={4} className={styles['table-span']}>故障原因</Col>
              <Col span={8} className={styles['table-span']}>{ selectOption.repairContentTyp.map((item,ind)=>item.value===BaseInfoInfoData.repairContentTyp?item.text:'')}</Col>
              <Col span={4} className={styles['table-span']}>维修结果</Col>
              <Col span={8} className={styles['table-span']}>{ selectOption.repairResult.map((item,ind)=>item.value===BaseInfoInfoData.repairResult?item.text:'')}</Col>
              <Col span={4} className={styles['table-span']}>维修费用（总计）</Col>
              <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.actualPrice }</Col>
              <Col span={4} className={styles['table-span']}>维修备注</Col>
              <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.tfRemarkWx }</Col>
              <Col span={4} className={styles['table-span']}></Col>
              <Col span={8} className={styles['table-span']}></Col>
            </Row>
         }
     </TabPane>
     <TabPane tab="验收信息" key="4">
       <Row type="flex"  className={styles['table-row']}>
         <Col span={4} className={styles['table-span']}>验收科室</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.checkDeptNam }</Col>
         <Col span={4} className={styles['table-span']}>验收人</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.rrAcceUsername }</Col>
         <Col span={4} className={styles['table-span']}>验收结果</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.rrAcceFstate === "65" ? "验收通过" : "验收不通过" }</Col>  
         <Col span={4} className={styles['table-span']}>验收时间</Col>
         <Col span={8} className={styles['table-span']}>{ BaseInfoInfoData.rrAcceAate }</Col>
       </Row>
     </TabPane>
     <TabPane tab="资产配件" key="5">
       {
         BaseInfoInfoData.rrpairOrderGuid?
         <AssetParts rrpairOrderGuid={BaseInfoInfoData.rrpairOrderGuid}/>
         :
         null
       }
     </TabPane>
   </Tabs>
   </Content>
    )
  }
}

 export default BaseInfo;

