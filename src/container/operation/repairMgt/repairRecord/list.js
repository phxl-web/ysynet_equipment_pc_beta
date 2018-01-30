/**
 * 维修记录列表
 */ 
import React, { Component } from 'react';
import { Row,Col,Input,Icon, Layout } from 'antd';
import TableGrid from '../../../../component/tableGrid';
import { Link} from 'react-router-dom';
import assets from '../../../../api/assets';
import { repairCommonDataSource } from '../../../../constants'
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
      ...repairCommonDataSource,
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
        <Content className='ysynet-content ysynet-common-bgColor'>
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