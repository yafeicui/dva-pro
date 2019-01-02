import { routerRedux } from 'dva/router';
import routerData from '@/components/routes';
import { Cookie } from '@/components/storage';

export default {
  namespace: 'layout',
  state: {
    userAuthor: 'creator',
    sideBarMenu: [],
    activeUrl: '',
    crumbsParams: []
  },
  reducers: {
    setUrl(state, query) {
      state.activeUrl = query.url;
      return { ...state };
    },
    setSideBarData(state) {
      let routers = routerData.routerData;
      let author = state.userAuthor;
      let sideBarMenu = [];
      routers.forEach(ele => {
        if (ele.routes && ele.author.indexOf(author) !== -1) {
          let obj = {
            path: ele.path,
            icon: ele.icon,
            name: ele.name,
            redirect: ele.redirect,
            children: []
          };
          ele.routes.forEach(item => {
            if (item.author.indexOf(author) !== -1 || !ele.author.length) {
              obj.children.push(item);
            }
          });
          if (obj.children.length > 0) sideBarMenu.push(obj);
        } else {
          if (ele.author.indexOf(author) !== -1 || !ele.author.length) {
            sideBarMenu.push(ele);
          }
        }
      });
      state.sideBarMenu = sideBarMenu;
      return { ...state };
    },
    setCrumbs(state, { params }) {
      let routers = routerData.routerData;
      let crumbsParams = [];
      routers.forEach(ele => {
        if (ele.routes) {
          ele.routes.forEach(item => {
            if (item.path === params) {
              crumbsParams.push(
                { url: ele.path, name: ele.name },
                { url: item.path, name: item.name }
              );
            }
          });
        } else {
          if (ele.path === params) {
            crumbsParams.push({ url: ele.path, name: ele.name });
          }
        }
      });
      state.crumbsParams = crumbsParams;
      return { ...state };
    }
  },
  effects: {
    *changeUrl({ payload }, { call, put }) {
      yield put({ type: 'setUrl', url: payload.url });
      yield put({ type: 'setCrumbs', params: payload.url });
      yield put(
        routerRedux.push({
          pathname: payload.url
        })
      );
    },
    *checkUrl({ payload }, { call, put }) {
      let routers = routerData.routerData;
      let url = '';
      routers.forEach(ele => {
        if (ele.routes) {
          if (ele.path === payload) {
            url = ele.path;
          }
          ele.routes.forEach(item => {
            if (item.path === payload) {
              url = item.path;
            }
          });
        } else {
          if (ele.path === payload) {
            url = ele.path;
          }
        }
      });
      if (url) {
        yield put({ type: 'setUrl', url });
      } else {
        yield put({ type: 'setUrl', url: '' });
      }
    },
    *checkIsLogin({ pathname }, { call, put }) {
      if (!Cookie.get('userName')) {
        pathname !== '/login'
          ? yield put(
              routerRedux.push({
                pathname: '/login'
              })
            )
          : '';
      } else {
        yield put({ type: 'setSideBarData' });
        yield put({ type: 'checkUrl', payload: pathname });
        yield put({ type: 'setCrumbs', params: pathname });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        // if (pathname === '/') {
        dispatch({ type: 'checkIsLogin', pathname });
        // }
      });
    }
  }
};
