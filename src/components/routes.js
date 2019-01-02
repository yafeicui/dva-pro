import dva from 'dva';
import dynamic from 'dva/dynamic';

const app = dva();
const WelcomePage = dynamic({
  app,
  component: () => import('@/routes/welcome')
});
const HomePage = dynamic({ app, component: () => import('@/routes/home') });
const DevicePage = dynamic({ app, component: () => import('@/routes/device') });
const PutPage = dynamic({ app, component: () => import('@/routes/put') });
const AuthorPage = dynamic({ app, component: () => import('@/routes/author') });
const ApprovelPage = dynamic({
  app,
  component: () => import('@/routes/approvel')
});
const SystemPage = dynamic({ app, component: () => import('@/routes/system') });
const RulePage = dynamic({ app, component: () => import('@/routes/rule') });
const NotFoundPage = dynamic({ app, component: () => import('@/routes/404') });

export default {
  routerData: [
    {
      path: '/',
      exact: true,
      comp: WelcomePage,
      author: [] //author为[]表示所有页面都展示
    },
    {
      path: '/page',
      icon: 'project',
      name: '弹屏管理',
      exact: false,
      author: ['admin', 'creator'],
      redirect: '/page/home',
      routes: [
        {
          icon: 'user',
          name: '首页',
          path: '/page/home',
          exact: true,
          author: ['admin', 'creator'],
          comp: HomePage
        },
        {
          icon: 'check',
          name: '审批',
          path: '/page/approve-manage',
          exact: true,
          author: ['creator'],
          comp: ApprovelPage
        },
        {
          icon: 'tool',
          name: '设备管理',
          path: '/page/device',
          exact: true,
          author: ['creator'],
          comp: DevicePage
        },
        {
          icon: 'key',
          name: '授权管理',
          path: '/page/author-manage',
          author: ['admin', 'creator'],
          comp: AuthorPage
        },
        {
          icon: 'file',
          name: '投放页',
          path: '/page/manage-put-page',
          author: ['admin', 'creator'],
          comp: PutPage
        }
      ]
    },
    {
      name: '系统管理',
      icon: 'shopping',
      path: '/system',
      author: ['creator'],
      comp: SystemPage
    },
    {
      name: '规则管理',
      icon: 'safety',
      path: '/rule',
      author: ['admin'],
      comp: RulePage
    },
    {
      comp: NotFoundPage,
      author: []
    }
  ]
};
