import React from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import RouterInit from '@/router';
import classnames, {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  minHeight,
  padding,
} from '~/tailwindcss-classnames';
import CHeader from '@/component/Common/CHead';

function App() {
  return (
    <div className='App'>
      <Layout>
        <CHeader />
        <Content>
          <div
            className={classnames(minHeight('min-h-screen'), padding('p-10'))}
          >
            <div
              className={classnames(
                backgroundColor('bg-white'),
                padding('p-5'),
                borderWidth('border-2'),
                borderColor('border-gray-200'),
                borderRadius('rounded-md'),
                boxShadow('shadow-2xl'),
              )}
            >
              <RouterInit />
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
