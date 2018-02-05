/**
 * @file 维修信息 Card
 */
import React, { PureComponent } from 'react';
import { Row, Col, Radio, Form, Select, DatePicker, Input } from 'antd';
import PropTypes from 'prop-types';
import { selectOption } from '../../../../constants';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
const gridStyle = {
  label: {
    span: 4,
    style: { textAlign: 'right', height: 50, lineHeight: '50px' }
  }, 
  content: {
    span: 8,
    style: { textAlign: 'left', height: 50, lineHeight: '50px' }
  }
}
// 内修
class InsideRepairForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isClosed: false
    }
  }
  
  onChange = (val) => {
    if (val === '3') {
      this.setState({isClosed: true})
    } else {
      this.setState({isClosed: false})
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isClosed } = this.state;
    const { isEdit, data } = this.props;
    const Comp = isClosed ? [
      <Col {...gridStyle.label} key={1}>关闭原因：</Col>,
      <Col {...gridStyle.content} key={2}>
        {
          getFieldDecorator('offCause')(
            isEdit ? <span> {data.offCause} </span> :
            <Select allowClear>
              {
                selectOption.offCause.map((item, index) => (
                  <Option value={item.value} key={index}> { item.text } </Option>
                ))
              }
            </Select>
        )}
      </Col>,
      <Col {...gridStyle.label} key={3}>后续处理：</Col>,
      <Col {...gridStyle.content} key={4}>
        {
          getFieldDecorator('followupTreatment')(
            isEdit ? <span> {data.followupTreatment} </span> :
            <Select allowClear>
              {
                selectOption.followupTreatment.map((item, index) => (
                  <Option value={item.value} key={index}> { item.text } </Option>
                ))
              }
            </Select>
        )}
      </Col>,
      <Col span={4} style={{marginTop: 20, textAlign: 'right'}} key={5}>关闭备注：</Col>,
      <Col span={20} style={{marginTop: 20}} key={6}>
        {
          getFieldDecorator('tfRemarkGb')(
            isEdit ? <span> {data.tfRemarkGb} </span> :
            <TextArea rows={4} style={{width: '100%'}} />
        )}
      </Col>
    ] : [
      <Col span={4} style={{marginTop: 20, textAlign: 'right'}} key={7}>维修备注：</Col>,
      <Col span={20} style={{marginTop: 20}} key={8}>
        {
          getFieldDecorator('tfRemarkWx')(
            isEdit ? <span> {data.tfRemarkWx} </span> :
            <TextArea rows={4} style={{width: '100%'}} />
        )}
      </Col>
    ];
    return (
      <Form>
        <Row type='flex'>
          <Col {...gridStyle.label}>维修人电话：</Col>
          <Col {...gridStyle.content}>
            {
              getFieldDecorator('inRrpairPhone')(
                isEdit ? <span> {data.inRrpairPhone} </span> :
                <Input placeholder='请输入维修人电话'/>
            )}
          </Col>
          <Col {...gridStyle.label}>维修结果：</Col>
          <Col {...gridStyle.content}>
            {
              getFieldDecorator('repairResult')(
                isEdit ? <span> {data.repairResult} </span> :
                <Select allowClear onChange={this.onChange}>
                  {
                    selectOption.followupTreatment.map((item, index) => (
                      <Option value={item.value} key={index}> { item.text } </Option>
                    ))
                  }
                </Select>
            )}
          </Col>
          <Col {...gridStyle.label}>维修费用（总计）：</Col>
          <Col {...gridStyle.content}>
            {
              getFieldDecorator('actualPrice')(
                isEdit ? <span> ￥{data.actualPrice} </span> :
                <Input addonBefore="￥"/>
            )}
          </Col>
          <Col {...gridStyle.label}>故障类型：</Col>
          <Col {...gridStyle.content}>
            {
              getFieldDecorator('repairContentType')(
                isEdit ? <span> {data.repairContentType} </span> :
                <Select allowClear>
                  {
                    selectOption.repairContentType.map((item, index) => (
                      <Option value={item.value} key={index}> { item.text } </Option>
                    ))
                  }
                </Select>
            )}
          </Col>
          <Col {...gridStyle.label}>故障原因：</Col>
          <Col span={20} style={gridStyle.content.style}>
            {
              getFieldDecorator('repairContentTyp')(
                isEdit ? <span> {data.repairContentTyp} </span> :
                <Select allowClear style={{width: '40%'}}>
                  {
                    selectOption.repairContentTyp.map((item, index) => (
                      <Option value={item.value} key={index}> { item.text } </Option>
                    ))
                  }
                </Select>
            )}
          </Col>
          {
            Comp
          }
        </Row>
      </Form>  
    )
  }
}

// 外修
class OutsideRepairForm extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isEdit, data } = this.props;
    return (
      <Form>
        <Row type='flex'>
          <Col {...gridStyle.label}>指派服务商：</Col>
          <Col {...gridStyle.content}>
            {
              getFieldDecorator('outOrg')(
                isEdit ? <span> {data.outOrg} </span> :
                <Input placeholder='输入服务商'/>
            )}
          </Col>
          <Col {...gridStyle.label}>维修联系电话：</Col>
          <Col {...gridStyle.content}>
            {
              getFieldDecorator('outRrpairPhone')(
                isEdit ? <span> {data.outRrpairPhone} </span> :
                <Input placeholder='输入联系电话'/>
            )}
          </Col>
          <Col {...gridStyle.label}>预期完成时间：</Col>
          <Col span={20} style={gridStyle.content.style}>
            {
              getFieldDecorator('completTime')(
                isEdit ? <span> {data.completTime} </span> :
                <DatePicker style={{width: '40%'}}/>
            )}
          </Col>
          <Col span={4} style={{marginTop: 20, textAlign: 'right'}}>指派备注：</Col>
          <Col span={20} style={{marginTop: 20}}>
            {
              getFieldDecorator('tfRemarkZp')(
                isEdit ? <span> {data.tfRemarkZp} </span> :
                <TextArea rows={4} style={{width: '100%'}} />
            )}
          </Col>
        </Row>
      </Form> 
    )
  }
}
class ServiceInfo extends PureComponent {
  static defaultProps = {
    isEdit: false,
    data: {}
  };
  static propTypes = {
    isEdit: PropTypes.bool,
    data: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      rrpairType: this.props.rrpairType || '00'
    }
  }
  postData = () => {
    const { rrpairType } = this.state;
    const data = this.wrapperForm.props.form.getFieldsValue();
    return {...data, rrpairType: rrpairType}
  }
  render() {
    const { rrpairType } = this.state;
    const { isEdit, data } = this.props;
    const Comp = rrpairType === "00" ? Form.create()(InsideRepairForm) : Form.create()(OutsideRepairForm)
    return (
      <div>
        <Row type="flex">
          <Col {...gridStyle.label}>维修方式：</Col>
          <Col span={16} style={gridStyle.content.style}>
            <RadioGroup defaultValue="00" onChange={e => this.setState({rrpairType: e.target.value})}>
              <RadioButton value="00" disabled={isEdit && rrpairType !== '00'}>内修</RadioButton>
              <RadioButton value="01" disabled={isEdit && rrpairType !== '01'}>外修</RadioButton>
            </RadioGroup>
          </Col>
        </Row>
        <Comp wrappedComponentRef={(inst) => this.wrapperForm = inst} isEdit={isEdit} data={data}/>
      </div>  
    )
  }
}
export default ServiceInfo;