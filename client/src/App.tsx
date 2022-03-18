import React, {ReactNode} from "react";
import RouterInit from "@/router";
import {Layout} from "antd";
import {Content, Footer, Header} from "antd/lib/layout/layout";

function App() {
    return (
        <div className="App">
            <Layout>
                <Header>header</Header>
                <Content>
                    <RouterInit/>
                </Content>
            </Layout>

        </div>
    )
}

export default App
