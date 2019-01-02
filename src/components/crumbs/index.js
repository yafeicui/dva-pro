import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import styles from './index.less';

const BreadcrumbPage = ({ params = [] }) => {
  return (
    <Breadcrumb className={styles.crumbsCont}>
      <Breadcrumb.Item href="/">
        <Icon type="home" />
      </Breadcrumb.Item>
      {params.map(ele => {
        return (
          <Breadcrumb.Item key={ele.url}>
            <span>{ele.name}</span>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbPage;
