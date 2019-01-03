import React, { Component } from 'react';
import { Button, Modal, Form, Input, InputNumber, Spin } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;

class ModalLayer extends Component {
  onCancel = () => {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'device/onCancel'
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'device/handleSave',
          payload: { ...values }
        });
      }
    });
  };
  render() {
    const { visible, title, formData, onReset, formLoad } = this.props;
    const { getFieldDecorator } = this.props.form;
    if (onReset) this.props.form.resetFields(); // 保存，更新成功后重置表单
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
          <Form>
            <FormItem
              label="设备信息"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator('deviceId', {
                initialValue: formData.deviceId,
                rules: [
                  {
                    required: true,
                    message: '请输入设备信息'
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem
              label="公司唯一机器码"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator('serialNumber', {
                initialValue: formData.serialNumber
              })(<Input />)}
            </FormItem>
            <FormItem
              label="机型"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator('model', {
                initialValue: formData.model
              })(<Input />)}
            </FormItem>
            <FormItem
              label="设备持有者"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator('owner', {
                initialValue: formData.owner
              })(<Input />)}
            </FormItem>
            <FormItem
              label="用户id白名单"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator('userId', {
                initialValue: formData.userId
              })(<InputNumber max={2147483647} style={{ width: '100%' }} />)}
            </FormItem>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

function mapStateToProps({ device }) {
  return {
    formData: device.formData,
    visible: device.visible,
    title: device.title,
    onReset: device.onReset,
    formLoad: device.formLoad
  };
}
export default connect(mapStateToProps)(Form.create()(ModalLayer));
