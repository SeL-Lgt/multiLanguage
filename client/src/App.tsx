import React from "react";
import { Layout } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import RouterInit from "@/router";

function App() {
  return (
    <div className='App'>
      <Layout>
        <Header>header</Header>
        <Content>
          <RouterInit />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
