import React, { Component } from 'react';
import styles from './index.less';
import { Form, Icon, Input, Button, Spin } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;

class LoginPage extends Component {
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'login/handleLogin',
          payload: { ...values }
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.loginContainer}>
        <Form className={styles.loginForm}>
          <h5 className={styles.title}>系统</h5>
          <Spin spinning={this.props.loading}>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="用户名"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                onClick={this.handleSubmit}
                className={styles.loginFormButton}
              >
                登录
              </Button>
            </FormItem>
          </Spin>
        </Form>
      </div>
    );
  }
}
function mapStateToProps({ login }) {
  return {
    loading: login.loading
  };
}
export default connect(mapStateToProps)(Form.create()(LoginPage));
