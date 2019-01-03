import { fetchAppList } from '@/services/home';
import {
  locationTableList,
  savePut,
  updatePut,
  deletePutData
} from '@/services/put';
import { message } from 'antd';

export default {
  namespace: 'put',
  state: {
    tableData: [],
    appId: '',
    appIdList: [],
    pagination: {
      pageSize: 10,
      current: 1,
      total: 0
    },
    loading: false,
    visible: false,
    title: '',
    formData: {},
    formLoad: false
  },
  reducers: {
    initData(state) {
      state.appIdList = [];
      state.appId = '';
      state.tableData = [];
      state.pagination.current = 1;
      state.pagination.total = 0;
      state.loading = false;
      state.formLoad = false;
      return { ...state };
    },
    setAppList(state, { payload }) {
      state.appIdList = [...payload];
      state.appId = payload[0].id;
      return { ...state };
    },
    changeAppIdData(state, { appId }) {
      state.appId = appId;
      return { ...state };
    },
    setTableData(state, { payload }) {
      state.tableData = payload.list || [];
      state.pagination.current = payload.pageId;
      state.pagination.total = payload.totalCount;
      state.loading = false;
      return { ...state };
    },
    setLoading(state, { loading }) {
      state.loading = loading;
      return { ...state };
    },
    changeTablePage(state, { query }) {
      state.pagination.current = query.current;
      return { ...state };
    },
    showModal(state, { query }) {
      state.visible = true;
      state.title = query.title;
      state.onReset = false;
      if (query.row) {
        state.formData = { ...query.row };
        state.id = query.row.id;
      }
      return { ...state };
    },
    closeModal(state) {
      state.visible = false;
      return { ...state };
    },
    resetData(state) {
      state.formData = {};
      state.title = '';
      state.onReset = true;
      state.id = '';
      return { ...state };
    },
    formLoading(state, { loading }) {
      state.formLoad = loading;
      return { ...state };
    }
  },
  effects: {
    *init({ payload }, { call, put }) {
      yield put({ type: 'initData' });
      yield put({ type: 'getAppListData' });
    },
    *getAppListData({ payload }, { call, put }) {
      yield put({ type: 'setLoading', loading: true });
      const res = yield fetchAppList()
        .then(res => {
          return res;
        })
        .catch(() => {});
      if (res.data.length) {
        yield put({ type: 'setAppList', payload: res.data });
        yield put({ type: 'getTableData' });
      }
    },
    *getTableData({ payload }, { select, call, put }) {
      yield put({ type: 'setLoading', loading: true });
      let data = yield select();
      let query = {
        page: data.put.pagination.current,
        pageSize: 10,
        appId: data.put.appId
      };
      const res = yield locationTableList(query)
        .then(res => {
          return res;
        })
        .catch(() => {});
      if (res) {
        yield put({ type: 'setTableData', payload: res.data });
      } else {
        yield put({ type: 'setLoading', loading: false });
      }
    },
    *changeAppId({ appId }, { call, put }) {
      yield put({ type: 'changeAppIdData', appId });
      yield put({ type: 'getTableData' });
    },
    *changePage({ query }, { call, put }) {
      yield put({ type: 'changeTablePage', query });
      yield put({ type: 'getTableData' });
    },
    *handleSave({ payload }, { select, call, put }) {
      yield put({ type: 'formLoading', loading: true });
      let data = yield select();
      let putData = data.put;
      let url = savePut;
      let params = { ...payload };
      if (putData.id) {
        url = updatePut;
        params.id = putData.id;
      }
      const res = yield url(params)
        .then(() => {
          message.success('操作成功');
          return {};
        })
        .catch(() => {});
      if (res) {
        yield put({ type: 'onCancel' });
        yield put({ type: 'getTableData' });
      }
      yield put({ type: 'formLoading', loading: false });
    },
    *deleteTableRow({ query }, { call, put }) {
      const res = yield deletePutData({ locationId: query.id })
        .then(() => {
          message.success('操作成功');
          return {};
        })
        .catch(() => {});
      if (res) {
        yield put({ type: 'changeTablePage', query: { current: 1 } });
        yield put({ type: 'getTableData' });
      }
    },
    *onCancel({ payload }, { call, put }) {
      yield put({ type: 'closeModal' });
      yield put({ type: 'resetData' });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/page/manage-put-page') {
          dispatch({ type: 'init' });
        }
      });
    }
  }
};
