/**
 * 维修记录列表
 */ 
import React, { Component } from 'react';
import { Row,Col,Input,Icon, Layout } from 'antd';
import TableGrid from '../../../../component/tableGrid';
import { Link} from 'react-router-dom';
import assets from '../../../../api/assets';

const { Content } = Layout;
const Search = Input.Search;
const { RemoteTable } = TableGrid;

class RepairRecordList extends Component {



  render() {
    const columns = [
      {
        title: '操作',
        dataIndex: 'RN',
        width: 80,
        render: (text, record) => 
          <span>
            <Link to={{pathname: `/operation/repairMgt/repairRecord/${record.rrpairOrderGuid}`}}><Icon type="form" />详情</Link>

          </span>  
      },
      {
        title: '维修单号',
        dataIndex: 'rrpairOrderNo',
        width: 200
      },
      {
        title: '单据状态',
        dataIndex: 'orderFstate',
        width: 80
      },
      {
        title: '资产名称',
        dataIndex: 'equipmentStandardName',
        width: 100
      },
      {
        title: '使用科室',
        dataIndex: 'deptName',
        width: 100,
      },
      {
        title: '管理员',
        dataIndex: 'custodian',
        width: 100,
      },
      {
        title: '报修人',
        dataIndex: 'rrpairUsername',
        width: 100
      },
      {
        title: '报修时间',
        dataIndex: 'createDate',
        width: 120
      },
      {
        title: '维修员',
        dataIndex: 'inRrpairUsername',
        width: 100
      },
      {
        title: '维修时间',
        dataIndex: 'createDate',
        width: 120
      }
    ];
    return (
        <Content>
          <Row>
            <Col span={12}>
              <Search
                placeholder="请输入维修单号/资产编号/资产名称"
                onSearch={value => console.log(value)}
                style={{ width: 300 }}
                enterButton="搜索"
              />
            </Col>
          </Row>
          <RemoteTable
            ref='remote'
            url={assets.selectRrpairList}
            scroll={{x: '100%', y : document.body.clientHeight - 311 }}
            columns={columns}
            rowKey={'RN'}
            style={{marginTop: 10}}
            size="small"
          /> 
        </Content>
    )
  }
}
export default RepairRecordList;