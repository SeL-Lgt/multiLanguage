import React from 'react';
import { Button, Form, Input } from 'antd';
import classnames, {
  display,
  justifyContent,
  space,
} from '~/tailwindcss-classnames';
import { AntdTable } from '@/component/Common/CTable/ATable';

function CopyWritingManagement() {
  const [form] = Form.useForm();

  const onSearch = () => {
    console.log(form.getFieldsValue());
  };

  return (
    <div className={classnames(space('space-y-5'))}>
      <Form
        layout='inline'
        form={form}
        className={classnames(justifyContent('justify-between'))}
      >
        <Form.Item label='模块' name='module'>
          <Input />
        </Form.Item>
        <Form.Item label='语言类型' name='languageType'>
          <Input />
        </Form.Item>
        <Form.Item label='Key值' name='key'>
          <Input />
        </Form.Item>
        <Form.Item label='查询文案' name='text'>
          <Input />
        </Form.Item>
        <Form.Item>
          <div className={classnames(space('space-x-5'))}>
            <Button onClick={() => form.resetFields()}>重置</Button>
            <Button type='primary' onClick={() => onSearch()}>
              查询
            </Button>
          </div>
        </Form.Item>
      </Form>
      <div
        className={classnames(
          display('flex'),
          justifyContent('justify-between'),
        )}
      >
        <Button type='primary'>新增语言信息</Button>
        <div className={classnames(display('flex'), space('space-x-5'))}>
          <Button type='primary'>导入文案</Button>
          <Button>导出文案</Button>
        </div>
      </div>
      <AntdTable />
    </div>
  );
}

export default CopyWritingManagement;
