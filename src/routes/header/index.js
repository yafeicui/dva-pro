import React from 'react';
import { connect } from 'dva';
import { Menu, Dropdown, Button, Icon } from 'antd';
import { Cookie } from '@/components/storage';
import styles from './index.less';

const HeaderPage = ({ dispatch, headerPage }) => {
  function loginout() {
    dispatch({
      type: 'headerPage/logout'
    });
  }
  function getUserName() {
    let name = Cookie.get('userName');
    let userName = name.split('%')[0];
    return userName;
  }
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Button onClick={() => loginout()} type="primary">
          退登
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.headerCont}>
      <div className={styles.logoutButton}>
        <Dropdown overlay={menu} trigger={['click']}>
          <span className={styles.antDropdownLink}>
            {getUserName()} <Icon type="down" />
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

export default connect(({ headerPage }) => ({ headerPage }))(HeaderPage);
