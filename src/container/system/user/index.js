import React, { Component } from 'react';
import { Row,Col,Input,Icon, Layout } from 'antd';
import TableGrid from '../../../component/tableGrid';
import { Link } from 'react-router-dom'
import user from '../../../api/user';

const { Content } = Layout;
const Search = Input.Search;
const { RemoteTable } = TableGrid;

class SystemUser extends Component {
  render() {
    const columns = [
      {
        title: '操作',
        dataIndex: 'RN',
        width: 60,
        render: (text, record) => 
          <span>
            <Link to={{pathname: `/operation/repairMgt/repairRecord/detail`, state: { ...record } }}><Icon type="form" />详情</Link>
          </span>  
      },
      {
        title: '账号',
        dataIndex: 'repariNo',
        width: 200
      },
      {
        title: '用户名',
        dataIndex: 'repairFstate',
        width: 80
      },
      {
        title: '所属组',
        dataIndex: 'equipmetStandarName',
        width: 100
      },
      {
        title: '状态',
        dataIndex: 'useDeptCode',
        width: 100,
      },
      {
        title: '类型',
        dataIndex: 'adminUserName',
        width: 100,
      },
      {
        title: '所属机构',
        dataIndex: 'repairdName',
        width: 100
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
            url={user.getRepairRecordList}
            scroll={{x: '1800px', y: 315}}
            columns={columns}
            rowKey={'RN'}
            style={{marginTop: 10}}
            size="small"
          /> 
        </Content>
    )
  }
}
export default SystemUser;