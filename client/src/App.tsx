import React from 'react';
import { Layout } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import RouterInit from '@/router';
import classnames, {
  borderColor,
  borderWidth,
  margin,
} from '~/tailwindcss-classnames';

function App() {
  return (
    <div className='App'>
      <Layout>
        <Header>header</Header>
        <Content>
          <div
            className={classnames(
              borderColor('border-black'),
              borderWidth('border-2'),
              margin('mx-5', 'my-5'),
            )}
          >
            12312321
          </div>
          <RouterInit />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
