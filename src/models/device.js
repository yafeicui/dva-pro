import {
  deviceTableList,
  saveDevice,
  updateDevice,
  deleteDevice
} from '@/services/device';
import { message } from 'antd';

export default {
  namespace: 'device',
  state: {
    tableData: [],
    visible: false,
    loading: false,
    isEdit: false,
    onReset: true,
    pagination: {
      pageSize: 10,
      current: 1,
      total: 0
    },
    formData: {},
    title: '',
    id: ''
  },
  reducers: {
    changeLoading(state, { query }) {
      state.loading = query;
      return { ...state };
    },
    setTableData(state, { tableData }) {
      state.tableData = tableData.list || [];
      state.pagination.total = tableData.totalCount;
      state.pagination.current = tableData.pageId;
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
    onCancel(state) {
      state.visible = false;
      state.formData = {};
      state.title = '';
      state.onReset = true;
      state.id = '';
      return { ...state };
    }
  },
  effects: {
    *fetchTableData({ payload }, { select, call, put }) {
      const { device } = yield select();
      yield put({ type: 'changeLoading', query: true });
      const res = yield call(deviceTableList, {
        appId: 1,
        page: device.pagination.current
      });
      yield put({ type: 'setTableData', tableData: res.data });
      yield put({ type: 'changeLoading', query: false });
    },
    *handleSave({ payload }, { select, call, put }) {
      let { device } = yield select();
      let url = saveDevice;
      let params = { ...payload };
      if (device.id) {
        url = updateDevice;
        params.id = device.id;
      }
      const res = yield url(params)
        .then(() => {
          message.success('操作成功');
          return {};
        })
        .catch(() => {});
      if (res) {
        yield put({ type: 'onCancel' });
        yield put({ type: 'fetchTableData' });
      }
    },
    *changePage({ query }, { call, put }) {
      yield put({ type: 'changeTablePage', query });
      yield put({ type: 'fetchTableData' });
    },
    *deleteTableRow({ query }, { call, put }) {
      const res = yield deleteDevice({ id: query.id })
        .then(() => {
          message.success('操作成功');
          return {};
        })
        .catch(() => {});
      if (res) {
        yield put({ type: 'changeTablePage', query: { current: 1 } });
        yield put({ type: 'fetchTableData' });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/page/device') {
          dispatch({ type: 'fetchTableData' });
        }
      });
    }
  }
};
