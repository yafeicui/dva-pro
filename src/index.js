import dva from 'dva';
import './index.css';
import 'antd/dist/antd.css';
// 引入axios
import { createHttp } from './utils/request';
createHttp();
// import { message } from 'antd';
// import createHistory from 'history/createBrowserHistory';

// 1. Initialize
const app = dva({
  // history: createHistory(),
  // onError(e) {
  //   message.error(e.message, /* duration */ 3);
  // }
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/layout').default);
app.model(require('./models/device').default);
app.model(require('./models/login').default);
app.model(require('./models/put').default);
app.model(require('./models/header').default);
app.model(require('./models/approve').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
