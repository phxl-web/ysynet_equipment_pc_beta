/*借用管理 - 表单组件*/

import React, {Component} from 'react';

import {Form, Input, Row, Col, DatePicker, Select, Button, Icon} from 'antd';

import borrowMgt from '../../../../api/borrowMgt';

import request from '../../../../utils/request';

import queryString from 'querystring';

const FormItem = Form.Item;

const {Option} = Select;

const {RangePicker} = DatePicker;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
}

class BorrowMgtForm extends Component {
    state = {
        display: 'none',
        mgtDeptData: [],  //管理科室保存数据
        loanData: [],     //借出科室数据
    }
    componentDidMount() {
        request(borrowMgt.selectUseDeptList, {     //借出科室
            body: queryString.stringify({ deptType: "00" }),
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: (data) => {
                let loanData = [{text: "全部", value: ""}, ...data.result];
                this.setState({ loanData });
            },
            error: (err) => console.log(err)
        });
        request(borrowMgt.mgtDeptList, {     //管理科室
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: (data) => {
                let mgtDeptData = [{text: "全部", value: ""}, ...data.result];
                this.setState({ mgtDeptData });
            },
            error: (err) => console.log(err)
        });
    }
    toggle = () => {
        this.setState({
            display: this.state.display === 'none'? 'block' : 'none'
        })
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let loanDate = this.startEndDate(values.loanDate);
            let returnDate = this.startEndDate(values.returnDate)
            values.loanStartTime = loanDate[0];
            values.loanEndTime = loanDate[1];
            values.startTime = returnDate[0];
            values.endTime = returnDate[1];
            delete values.loanDate;
            delete values.returnDate;
            for (const key in values) {
                values[key] = values[key] === undefined? '' : values[key]
            };
            this.props.setQuery(values)
        })
    }
    startEndDate = (date) => {      //格式化开始结束时间
        let startTime = '';
        let endTime = '';
        if(date) {
            startTime = date[0].format('YYYY-MM-DD');
            endTime = date[1].format('YYYY-MM-DD');
        };
        return [startTime, endTime];
    }
    render() {
        let {getFieldDecorator} = this.props.form;
        let {display, mgtDeptData, loanData} = this.state;
        return (
            <Form onSubmit={this.handleSearch}>
                <Row gutter={30}>
                    <Col span={8}>
                        <FormItem label={`资产名称`} {...formItemLayout}>
                            {getFieldDecorator(`assetName`)(
                                <Input placeholder="请输入资产名称" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label={`资产编号`} {...formItemLayout}>
                            {getFieldDecorator(`assetsRecord`)(
                                <Input placeholder="请输入资产编号" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{ display }} >
                        <FormItem label={`管理科室`} {...formItemLayout}>
                            {getFieldDecorator(`bDeptGuid`)(
                                <Select 
                                    placeholder="请选择管理科室" 
                                    defaultActiveFirstOption = {false}
                                    allowClear={true}  
                                    filterOption={false}
                                >
                                    {mgtDeptData.map( d => <Option value={d.value} key={d.text} >{d.text}</Option> )}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{ display }} >
                        <FormItem label={`借用科室`} {...formItemLayout}>
                            {getFieldDecorator(`deptGuid`)(
                                <Select
                                    placeholder="请选择借用科室"
                                    defaultActiveFirstOption = {false}
                                    allowClear={true}  
                                    filterOption={false}
                                >
                                    {loanData.map( d => <Option value={d.value} key={d.text} >{d.text}</Option> )}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{ display }} >
                        <FormItem label={`借出日期`} {...formItemLayout}>
                            {getFieldDecorator(`loanDate`)(
                                <RangePicker />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{ display }} >
                        <FormItem label={`归还日期`} {...formItemLayout}>
                            {getFieldDecorator(`returnDate`)(
                                <RangePicker />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{ display }} >
                        <FormItem label={`单据状态`} {...formItemLayout}>
                            {getFieldDecorator(`borrowFstate`)(     //00已借出  01已归还
                                <Select 
                                    placeholder="请选择单据状态" 
                                    defaultActiveFirstOption = {false}
                                    allowClear={true}  
                                    filterOption={false}
                                >  
                                    <Option value="" key="03" >全部</Option>
                                    <Option value="00" key="00" >已借出</Option>
                                    <Option value="01" key="01" >已归还</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{ display }} >
                        <FormItem label={`借用编号`} {...formItemLayout}>
                            {getFieldDecorator(`borrowNo`)(
                                <Input placeholder="请输入借用编号" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{ textAlign: 'right' }} >
                        <Button type="primary" htmlType="submit" >查询</Button>
                        <Button style={{ margin: '0 8px' }} onClick={() => { this.props.form.resetFields(); }}>重置</Button>
                        <a onClick={this.toggle}>{ display === 'none'? '展开' : '收起' }<Icon type={ display === 'none'? 'down' : 'up' } /></a>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default Form.create()(BorrowMgtForm);