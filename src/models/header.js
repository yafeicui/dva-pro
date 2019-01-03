import { handleLogout } from '@/services/header';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'headerPage',
  state: {},
  reducers: {},
  effects: {
    *logout({ payload }, { call, put }) {
      const res = yield handleLogout()
        .then(res => {
          return res;
        })
        .catch(() => {});
      if (res) {
        yield put(
          routerRedux.push({
            pathname: '/'
          })
        );
      }
    }
  }
};
