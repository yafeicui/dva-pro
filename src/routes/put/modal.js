import React, { Component } from 'react';
import { Button, Modal, Form, Input, Select, InputNumber, Spin } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

const FormItem = Form.Item;
const Option = Select.Option;
class ModalLayer extends Component {
  onCancel = () => {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'put/onCancel'
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'put/handleSave',
          payload: { ...values }
        });
      }
    });
  };
  render() {
    const {
      visible,
      title,
      formData,
      appIdList,
      onReset,
      formLoad
    } = this.props;
    if (onReset) this.props.form.resetFields(); // 保存，更新成功后重置表单
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        visible={visible}
        title={title}
        okText="Create"
        onCancel={this.onCancel}
        onOk={this.handleSubmit}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={this.handleSubmit}
            loading={formLoad}
          >
            提交
          </Button>
        ]}
      >
        <Spin spinning={formLoad}>
          <Form className={styles.putPageModal}>
            <FormItem
              label="应用"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('appId', {
                initialValue: formData.appId,
                rules: [{ required: true, message: '请选择应用' }]
              })(
                <Select style={{ width: '100%' }}>
                  {appIdList.map(ele => {
                    return (
                      <Option value={ele.id} key={ele.id}>
                        {ele.desc}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </FormItem>
            <FormItem
              label="投放页面别名"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('disName', {
                initialValue: formData.disName,
                rules: [{ required: true, message: '请输入投放页面别名' }]
              })(<Input />)}
            </FormItem>
            <FormItem
              label="android页面唯一id"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('androidValue', {
                initialValue: formData.androidValue,
                rules: [
                  { required: false, message: '请输入android页面唯一id!' }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem
              label="ios页面唯一id"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('iosValue', {
                initialValue: formData.iosValue,
                rules: [{ required: false, message: '请输入ios页面唯一id!' }]
              })(<Input />)}
            </FormItem>
            <FormItem
              label="一天弹屏限制"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('fireworkCountOneDay', {
                initialValue: formData.fireworkCountOneDay,
                rules: [{ required: true, message: '请输入一天弹屏限制!' }]
              })(<Input type="number" />)}
            </FormItem>
            <FormItem
              label="弹屏间隔时间(秒)"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('intervalSeconds', {
                initialValue: formData.intervalSeconds,
                rules: [{ required: true, message: '请输入弹屏间隔时间!' }]
              })(<InputNumber min={0} style={{ width: '100%' }} />)}
            </FormItem>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

function mapStateToProps({ put }) {
  return {
    formData: put.formData,
    visible: put.visible,
    title: put.title,
    onReset: put.onReset,
    appIdList: put.appIdList,
    formLoad: put.formLoad
  };
}

export default connect(mapStateToProps)(Form.create()(ModalLayer));
