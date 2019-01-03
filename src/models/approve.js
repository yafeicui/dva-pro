import { fetchAppList } from '@/services/home';
import { waitingTableList, alreadyTableList } from '@/services/approve';

export default {
  namespace: 'approve',
  state: {
    loading: false,
    tableData: [],
    appId: '',
    appIdList: [],
    typeValue: 1,
    pagination: {
      pageSize: 10,
      current: 1,
      total: 0
    }
  },
  reducers: {
    initData(state) {
      state.loading = false;
      state.tableData = [];
      state.appId = '';
      state.appIdList = [];
      state.typeValue = 1;
      state.pagination = {
        pageSize: 10,
        current: 1,
        total: 0
      };
      return { ...state };
    },
    setLoading(state, { loading }) {
      state.loading = loading;
      return { ...state };
    },
    setAppList(state, { payload }) {
      state.appIdList = [...payload];
      state.appId = payload[0].id;
      return { ...state };
    },
    setTableData(state, { tableData }) {
      state.tableData = tableData.list || [];
      state.pagination.total = tableData.totalCount;
      state.pagination.current = tableData.pageId;
      return { ...state };
    },
    changeAppIdData(state, { appId }) {
      state.appId = appId;
      return { ...state };
    },
    changeTablePage(state, { query }) {
      state.pagination.current = query.current;
      return { ...state };
    },
    setRadio(state, { typeValue }) {
      state.tableData = [];
      state.loading = false;

      state.typeValue = typeValue;
      state.pagination.current = 1;
      state.pagination.total = 0;
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
      let { approve } = yield select();
      let query = {
        page: approve.pagination.current,
        pageSize: 10,
        appId: approve.appId
      };
      let url = '';
      approve.typeValue === 1
        ? (url = waitingTableList)
        : (url = alreadyTableList);
      const res = yield url(query)
        .then(res => {
          return res;
        })
        .catch(() => {});
      yield put({ type: 'setLoading', loading: false });
      if (res) {
        yield put({ type: 'setTableData', tableData: res.data });
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
    *changeRadio({ typeValue }, { call, put }) {
      yield put({ type: 'setRadio', typeValue });
      yield put({ type: 'getTableData' });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/page/approve-manage') {
          dispatch({ type: 'init' });
        }
      });
    }
  }
};
