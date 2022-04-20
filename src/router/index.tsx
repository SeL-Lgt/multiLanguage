import React, { ReactNode } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/views/Home';
import CNotFound from '@/component/Common/CNotFound';
import Modules from '@/views/Modules';
import ModulesList from '@/views/Modules/List';
import ModulesDetail from '@/views/Modules/Detail';
import LanguageIndexManagement from '@/views/Mark';
import CopyWritingManagement from '@/views/CopyWriting';

export type RouterType = {
  path: string;
  index?: boolean;
  meta: {
    title: string;
    noShowMenu?: boolean;
    [key: string]: unknown;
  };
  redirect?: string;
  element?: ReactNode;
  children?: Array<RouterType>;
};

export type RouterViewType = {
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
    path: '/languageIndexManagement',
    meta: {
      title: '语言标识管理',
    },
    element: <LanguageIndexManagement />,
  },
  {
    path: '/Modules',
    meta: {
      title: '项目模块管理',
    },
    element: <Modules />,
    children: [
      {
        path: '',
        index: true,
        meta: {
          title: '项目模块管理',
          noShowMenu: true,
        },
        element: <ModulesList />,
      },
      {
        path: 'detail/:id',
        meta: {
          title: '模块详情',
          noShowMenu: true,
        },
        element: <ModulesDetail />,
      },
    ],
  },
  {
    path: '/copyWritingManagement',
    meta: {
      title: '文案管理',
    },
    element: <CopyWritingManagement />,
  },
  {
    path: '*',
    meta: {
      title: '404',
    },
    element: <CNotFound />,
  },
];

function RouterView({ router, path }: RouterViewType) {
  const tempPath = path ? `${path}/${router.path}` : router.path;
  if (!router.index && !router.path) {
    return (
      <Route key={`${path as string}Not`} path='404' element={<CNotFound />} />
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
