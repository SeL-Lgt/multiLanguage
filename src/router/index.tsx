import React, { ReactNode } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/views/Home';
import NotFound from '@/component/notFound';
import ProjectManagement from '@/views/ProjectManagement';
import ProjectManagementList from '@/views/ProjectManagement/List';
import ProjectManagementDetail from '@/views/ProjectManagement/Detail';

type RouterType = {
  path: string;
  index?: boolean;
  meta: {
    title: string;
    [key: string]: unknown;
  };
  redirect?: string;
  element?: ReactNode;
  children?: Array<RouterType>;
};

type RouterViewType = {
  router: RouterType;
  path: string | null | undefined;
};

export const routerList: Array<RouterType> = [
  {
    path: '/',
    meta: {
      title: '首页',
    },
    element: <Home />,
  },
  {
    path: '/projectManagement',
    meta: {
      title: '项目模块管理',
    },
    element: <ProjectManagement />,
    children: [
      {
        path: '',
        index: true,
        meta: {
          title: '项目模块管理',
        },
        element: <ProjectManagementList />,
      },
      {
        path: 'detail',
        meta: {
          title: '模块详情',
        },
        element: <ProjectManagementDetail />,
      },
    ],
  },
  {
    path: '*',
    meta: {
      title: '404',
    },
    element: <NotFound />,
  },
];

function RouterView({ router, path }: RouterViewType) {
  const tempPath = path ? `${path}/${router.path}` : router.path;
  if (!router.index && !router.path) {
    return (
      <Route key={`${path as string}Not`} path='404' element={<NotFound />} />
    );
  }
  if (!router.children) {
    return <Route key={tempPath} path={router.path} element={router.element} />;
  }
  return (
    <Route key={tempPath} path={router.path} element={router.element}>
      {router.children.map((item) =>
        RouterView({
          router: item,
          path: router.path,
        }),
      )}
    </Route>
  );
}

function RouterInit() {
  return (
    <div>
      <Routes>
        {routerList.map((item) =>
          RouterView({ router: item } as RouterViewType),
        )}
      </Routes>
    </div>
  );
}

export default RouterInit;
