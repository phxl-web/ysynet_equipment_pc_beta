/*
 * @Author: yuwei - 新建合同
 * @Date: 2018-07-10 16:45:38 
* @Last Modified time: 2018-07-10 16:45:38 
 */
import React, { Component } from 'react';
import { Row,Col,Input, Layout,Button,message,Form,Select} from 'antd';
import ledger from '../../../api/ledger';
import request from '../../../utils/request';
import queryString from 'querystring';
import PicWall from '../../../component/picWall';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { contractTypeSelect  } from '../../../constants';
const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const formItemLayoutLine = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const formItemLayoutLine2 = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
class AddContract extends Component {
  state={
    query:{},
    manageSelect:[],
    outDeptOptions: [],
    postFile:[],
    editStatus:false,
    editStatusText:'新建合同',
    fOrgName:"",//乙方名称
    bDeptName:"",//管理科室名称
    fillBackData:{},//回填数据
  }
  componentDidMount = () => {
    console.log(this.props)
    //this.props.user.orgName/orgId
    if(this.props.match.params.id){
      console.log('编辑状态')
      this.setState({
        editStatusText:'编辑合同',
        editStatus:true,
      })
      request(ledger.queryContractList,{
        body:queryString.stringify({contractId:this.props.match.params.id}),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: data => {
          if(data.status){
            this.setState({fillBackData:data.result.rows[0]})
          }else{
            message.error(data.msg)
          }
        },
        error: err => {console.log(err)}
      })
    }
    this.getManageSelect();
    this.outDeptSelect();
  }

  getManageSelect = () => {
    request(ledger.selectUseDeptList,{
      body:queryString.stringify({deptType:"01"}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if(data.status){
          this.setState({manageSelect:data.result})
        }else{
          message.error(data.msg)
        }
      },
      error: err => {console.log(err)}
    })
  }
  outDeptSelect = () => {
    request(ledger.getSelectFOrgList,{
      body:queryString.stringify({}),
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: data => {
        if(data.status){
                this.setState({outDeptOptions:data.result})
        }else{
                message.error(data.msg)
        }
      },
      error: err => {console.log(err)}
    })
  }
  handleSubmit = () =>{
    const { postFile } = this.state;
    this.props.form.validateFieldsAndScroll((err,values)=>{
      //新增
      let url = ledger.insertContract ; 
      if(this.state.editStatus){
        url = ledger.updateContract;
        delete values.rOrgId;
        delete values.RN;
        values = Object.assign(this.state.fillBackData,values);
        values.fstate="00";
      }else{
        values.rOrgId=this.props.user.orgId;
        values.rOrgName=this.props.user.orgName;
        values.fOrgName=this.state.fOrgName;
        values.bDeptName=this.state.bDeptName;
        values.fstate="00";
      }
      if(postFile.length>0){
        values.tfAccessoryList = postFile.map((item)=>{
          return item.thumbUrl
        })
      }
      console.log(JSON.stringify(values))
      request(url,{
        body:JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        },
        success: data => {
          if(data.status){
            message.warn('保存成功！')      
            const {history} = this.props;
            history.push('/ledger/contract')
          }else{
            message.error(data.msg)
          }
        },
        error: err => {console.log(err)}
      })
    })
  }

  goBack = ()=>{
    const { history } = this.props;
    history.push('/ledger/contract');
  }

  filterOption = (input, option) => {
    if(option.props.children){
      return option.props.children.indexOf(input) >= 0
    }
    return false
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { postFile , editStatusText , fillBackData } = this.state;//editStatus
    return (
      <Content className='ysynet-content ysynet-common-bgColor'>
        <h3 style={{padding:'24px'}}>{editStatusText}  
          <Button style={{float:'right'}} onClick={()=>this.goBack()}>取消</Button>
          <Button type='primary' style={{float:'right',marginRight:8}}  onClick={()=>this.handleSubmit()}>确认</Button>
        </h3>
        <Form >
            <FormItem
              {...formItemLayout}
              label="合同名称"
              >
              {getFieldDecorator('contractName',{
                initialValue:fillBackData.contractName||'',
                rules:[{required:true,message:'请选择合同名称'}]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="甲方"
              >
              {getFieldDecorator('rOrgId',{
                initialValue:fillBackData.orgName||this.props.user.orgName,
                rules:[{required:true,message:'请选择甲方'}]
              })(
                <Input disabled={true}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="乙方"
              >
              {getFieldDecorator('fOrgId',{
                initialValue:fillBackData.fOrgId||"",
                rules:[{required:true,message:'请选择乙方'}]
              })(
                <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option)=>this.filterOption(input, option)}
                onSelect={(value, option)=>{
                  console.log(option.props.children)
                  if(option.props.children){
                    this.setState({fOrgName:option.props.children})
                  }
                }}
                >
                    <Option value="" key={-1}>全部</Option>
                    {
                        this.state.outDeptOptions.map((item,index) => {
                        return <Option key={item.orgId} value={item.orgId}>{item.orgName}</Option>
                        })
                    }
                </Select>
              )}
            </FormItem>
            <Row>
              <Col span={12}> 
                <FormItem
                  {...formItemLayoutLine}
                  label="合同类型"
                >
                  {getFieldDecorator('contractFlag',{
                    initialValue:"01",
                    rules:[{required:true,message:'请选择合同类型'}]
                  })(
                    <Select>
                    {
                      contractTypeSelect.map((item)=>{
                        return <Option value={item.value} key={item.value}>{item.text}</Option>
                      })
                    }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12}> 
                <FormItem
                  {...formItemLayoutLine2}
                  label="合同编号"
                >
                  {getFieldDecorator('contractNo',{
                    initialValue:fillBackData.contractNo||"",
                    rules:[{required:true,message:'请填写合同编号'}]
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}> 
                <FormItem
                  {...formItemLayoutLine}
                  label="管理科室"
                >
                  {getFieldDecorator('bDeptGuid',{
                    initialValue:fillBackData.bDeptGuid||"",
                    rules:[{required:true,message:'请选择管理科室'}]
                  })(
                    <Select 
                      showSearch
                      placeholder={'请选择'}
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                      onSelect={(value, option)=>{
                        console.log(option.props.children)
                        if(option.props.children){
                          this.setState({bDeptName:option.props.children})
                        }
                      }}
                      >
                          <Option value="" key={-1}>全部</Option>
                          {
                              this.state.manageSelect.map((item,index) => {
                              return <Option key={index} value={item.value}>{item.text}</Option>
                              })
                          }
                      </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <FormItem label='附件' {...formItemLayout}>
                <PicWall file={data => {
                  this.setState({postFile: data})
                }} fileList={postFile}/>
              </FormItem>
            </Row>
        </Form>
      </Content>
    )
  }
}
export default withRouter(connect(state => state)(Form.create()(AddContract)));