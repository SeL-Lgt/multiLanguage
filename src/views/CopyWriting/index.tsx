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
import CopyWritingForm from '@/views/CopyWriting/component/form';
import ModulesServices from '@/api/modules';
import ModulesType from '@/type/modules';
import CopyWriting from '@/type/copyWriting';
import './index.less';
import MarkServices from '@/api/mark';
import MarkType from '@/type/mark';

function CopyWritingManagement() {
  const [form] = Form.useForm();
  const [modulesNameList, setModulesNameList] =
    useState<Array<ModulesType.queryModules>>();
  const [subModulesNameList, setSubModulesNameList] =
    useState<Array<ModulesType.SubModulesItem>>();
  const [markList, setMarkList] = useState<Array<MarkType.MarkItem>>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formType, setFormType] = useState<ModulesType.FormType>('Edit');
  const [formData, setFormData] = useState<CopyWriting.MarkFormDataType>();

  useEffect(() => {
    queryModulesNameList();
    queryUsedMarkList();
  }, []);

  /**
   * 查询父模块下拉详情
   */
  const queryModulesNameList = () => {
    ModulesServices.queryModulesNameList().then((res) => {
      setModulesNameList(res.data);
      modulesNameChange(res.data[0].modulesKey as string);
    });
  };

  /**
   * 父模块名字下拉选择列表
   */
  const modulesNameSelectView = () => {
    const optionView = modulesNameList?.map((item) => (
      <Select.Option key={item.modulesKey} value={item.modulesKey}>
        {item.modulesKey}
      </Select.Option>
    ));
    return optionView;
  };

  /**
   * 父模块下拉框改变时
   * 清空子模块，并查询父模块下的子模块
   * @param value
   */
  const modulesNameChange = (value: string) => {
    querySubModulesNameList(value);
    form.setFieldsValue({
      modulesKey: value,
      subModulesKey: null,
    });
  };

  /**
   * 查询子模块列表
   * @param modulesKey 父模块key
   */
  const querySubModulesNameList = (modulesKey: string) => {
    ModulesServices.querySubModulesNameList({
      modulesKey,
    }).then((res) => {
      setSubModulesNameList(res.data);
    });
  };

  /**
   * 子模块下拉选择列表渲染
   */
  const subModulesNameSelectView = () => {
    const optionView = subModulesNameList?.map((item) => (
      <Select.Option key={item.subModulesKey} value={item.subModulesKey}>
        {item.subModulesKey}
      </Select.Option>
    ));
    return optionView;
  };

  /**
   * 子模块下拉框改变时
   * @param value
   */
  const subModulesNameChange = (value: string) => {
    console.log(value);
  };

  /**
   * 获取已使用的语言类型
   */
  const queryUsedMarkList = () => {
    MarkServices.queryMarkList({
      isUsed: true,
    }).then((res) => {
      setMarkList(res.data);
    });
  };

  /**
   * 语言类型下拉选择列表渲染
   */
  const markSelectView = () => {
    const optionView = markList?.map((item) => (
      <Select.Option key={item.langKey} value={item.langKey}>
        {`${item.langKey}-${item.langText}`}
      </Select.Option>
    ));
    return optionView;
  };

  /**
   * 语言下拉列表改变时
   * @param value
   */
  const markSelectChange = (value: string) => {
    console.log(value);
  };

  /**
   * 条件查询列表
   */
  const onSearch = () => {
    console.log(form.getFieldsValue());
  };

  /**
   * 点击表单事件处理
   */
  const clickFormEvent = ({
    item = {
      modulesKey: form.getFieldsValue().modulesKey,
      subModulesKey: form.getFieldsValue().subModulesKey,
      copyKey: null,
      langList: [
        {
          langKey: null,
          langText: null,
        },
      ],
    },
    type = 'Edit',
  }: CopyWriting.ClickItemType) => {
    setFormData(item);
    setFormType(type);
    setShowModal(true);
  };

  /**
   * 关闭对话框
   */
  const closeModal = () => {
    setShowModal(false);
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
          <Select showSearch onChange={modulesNameChange}>
            {modulesNameSelectView()}
          </Select>
        </Form.Item>
        <Form.Item
          label='子模块'
          name='subModulesKey'
          className={classnames(width('w-1/5'))}
        >
          <Select showSearch allowClear onChange={subModulesNameChange}>
            {subModulesNameSelectView()}
          </Select>
        </Form.Item>
        <Form.Item
          label='语言类型'
          name='languageType'
          className={classnames(width('w-1/5'))}
        >
          <Select
            showSearch
            allowClear
            onChange={markSelectChange}
            optionFilterProp='children'
          >
            {markSelectView()}
          </Select>
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
        <Button type='primary' onClick={() => clickFormEvent({ type: 'New' })}>
          新增语言信息
        </Button>
        <div className={classnames(display('flex'), space('space-x-5'))}>
          <Button type='primary'>导入文案</Button>
          <Button>导出文案</Button>
        </div>
      </div>
      <AntdTable />
      <CopyWritingForm
        key={showModal.toString()}
        visible={showModal}
        type={formType}
        formData={formData}
        closeEvent={closeModal}
      />
    </div>
  );
}

export default CopyWritingManagement;
