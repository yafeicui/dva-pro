import { getLogin } from '@/services/login';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'login',
  state: {
    loading: false
  },
  reducers: {
    setLoading(state, { loading }) {
      state.loading = loading;
      return { ...state };
    }
  },
  effects: {
    *handleLogin({ payload }, { call, put }) {
      yield put({ type: 'setLoading', loading: true });
      const res = yield getLogin(payload)
        .then(res => {
          return res;
        })
        .catch(err => {});
      yield put({ type: 'setLoading', loading: false });
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
