import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Route, Switch, Redirect } from 'dva/router';
import { connect } from 'dva';
import CrumbsPage from '@/components/crumbs/index';
import styles from './index.less';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

const LayoutPage = ({ dispatch, layout }) => {
  function changeUrl(e) {
    if (layout.activeUrl !== e.key) {
      dispatch({
        type: 'layout/changeUrl',
        payload: {
          url: e.key
        }
      });
    }
  }
  function formSubmenusChild(obj) {
    let cHtml = <div />;
    let childArray = obj.children;
    if ('undefined' !== typeof childArray && childArray.length > 0) {
      cHtml = childArray.map((item, i) => {
        return formSubmenusChild(item);
      });
      return (
        <SubMenu
          key={obj.path}
          title={
            <span>
              <Icon type={obj.icon} />
              <span>{obj.name}</span>
            </span>
          }
        >
          {cHtml}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item routeurl={obj.path} key={obj.path} onClick={changeUrl}>
          {obj.name}
        </Menu.Item>
      );
    }
  }
  function menuItem(items) {
    let divHtml = items.map(ele => {
      if (ele.children) {
        return formSubmenusChild(ele);
      } else {
        return ele.name ? (
          <Menu.Item key={ele.path} onClick={changeUrl}>
            <Icon type={ele.icon} />
            <span>{ele.name}</span>
          </Menu.Item>
        ) : null;
      }
    });
    return divHtml;
  }
  function setRoute(items) {
    let routeCont = [];
    items.forEach((ele, index) => {
      if (ele.children) {
        if (ele.redirect) {
          routeCont.push(
            <Route path={ele.path} exact key={ele.path}>
              <Redirect to={ele.redirect} />
            </Route>
          );
        }
        ele.children.forEach(item => {
          routeCont.push(
            <Route
              path={item.path}
              exact={item.exact}
              component={item.comp}
              key={item.path}
            />
          );
        });
      } else {
        routeCont.push(
          <Route
            path={ele.path}
            exact={ele.exact}
            component={ele.comp}
            key={index}
          />
        );
      }
    });
    return routeCont;
  }
  // console.log(layout, 'layout-----');
  return (
    <Layout className={styles.layoutStyle}>
      <Sider>
        <div className={styles.logo}>管理</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[layout.activeUrl]}
          selectedKeys={[layout.activeUrl]}
        >
          {menuItem(layout.sideBarMenu)}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <div>头部</div>
        </Header>
        <div className={styles.crumbsCont}>
          <CrumbsPage params={layout.crumbsParams} />
        </div>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
            height: '100%'
          }}
        >
          <Switch>{setRoute(layout.sideBarMenu)}</Switch>
        </Content>
      </Layout>
    </Layout>
  );
};
export default connect(({ layout }) => ({
  layout
}))(LayoutPage);
