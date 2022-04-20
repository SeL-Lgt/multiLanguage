import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import classnames, {
  display,
  justifyContent,
  space,
  textAlign,
  width,
} from '~/tailwindcss-classnames';
import { AntdTable } from '@/component/Common/CTable/ATable';
import './index.less';
import ModulesServices from '@/api/modules';
import ModulesType from '@/type/modules';

function CopyWritingManagement() {
  const [form] = Form.useForm();
  const [nameList, setNameList] = useState<Array<ModulesType.queryModules>>();

  useEffect(() => {
    queryModulesNameList();
  }, []);

  /**
   * 查询父模块下拉详情
   */
  const queryModulesNameList = () => {
    ModulesServices.queryModulesNameList().then((res) => {
      setNameList(res.data);
      form.setFieldsValue({
        modulesKey: res.data[0]?.modulesKey,
        subModulesKey: null,
      });
    });
  };

  /**
   * 父模块名字下拉选择列表
   */
  const modulesNameSelectView = () => {
    const optionView = nameList?.map((item) => (
      <Select.Option key={item.modulesKey} value={item.modulesKey}>
        {item.modulesKey}
      </Select.Option>
    ));
    return optionView;
  };

  const modulesNameChange = (value: string) => {
    form.setFieldsValue({
      modulesKey: value,
      subModulesKey: null,
    });
  };

  const onSearch = () => {
    console.log(form.getFieldsValue());
  };

  return (
    <div className={classnames('copy-writing', space('space-y-5'))}>
      <Form
        layout='inline'
        form={form}
        className={classnames(justifyContent('justify-between'))}
      >
        <Form.Item
          label='父模块'
          name='modulesKey'
          className={classnames(width('w-1/5'))}
        >
          <Select showSearch allowClear onChange={modulesNameChange}>
            {modulesNameSelectView()}
          </Select>
        </Form.Item>
        <Form.Item label='子模块' name='subModulesKey'>
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
      </Form>
      <div className={classnames(textAlign('text-right'), space('space-x-5'))}>
        <Button onClick={() => form.resetFields()}>重置</Button>
        <Button type='primary' onClick={() => onSearch()}>
          查询
        </Button>
      </div>
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
