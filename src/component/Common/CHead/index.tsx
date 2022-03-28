import React from 'react';
import { Header } from 'antd/lib/layout/layout';
import { Menu } from 'antd';
import classnames, {
  display,
  margin,
  textColor,
} from '~/tailwindcss-classnames';
import { routerList, RouterViewType } from '@/router';
import { Link } from 'react-router-dom';

function CHeader() {
  const menuView = ({ router, path }: RouterViewType) => {
    if (router.path === '*' || router.meta?.noShowMenu) {
      return null;
    }
    const tempPath = path ? `${path}/${router.path}` : router.path;
    return (
      <Menu.Item key={tempPath}>
        <Link to={tempPath}>{router.meta.title}</Link>
      </Menu.Item>
    );
  };

  return (
    <Header className={classnames(display('flex'))}>
      <div className={classnames(textColor('text-white'), margin('mx-10'))}>
        <Link to='/'>多语言管理平台</Link>
      </div>
      <Menu mode='horizontal' theme='dark'>
        {routerList.map((item) => menuView({ router: item } as RouterViewType))}
      </Menu>
    </Header>
  );
}

export default CHeader;
