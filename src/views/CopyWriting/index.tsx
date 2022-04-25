import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import classnames, {
  display,
  justifyContent,
  space,
  textAlign,
  width,
} from '~/tailwindcss-classnames';
import { AntdTable, TablePropsType } from '@/component/Common/CTable/ATable';
import CopyWritingForm from '@/views/CopyWriting/component/form';
import ModulesServices from '@/api/modules';
import ModulesType from '@/type/modules';
import CopyWriting from '@/type/copyWriting';
import './index.less';
import MarkServices from '@/api/mark';
import MarkType from '@/type/mark';
import CopyWritingServices from '@/api/copyWriting';

function CopyWritingManagement() {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<TablePropsType>({
    data: {
      columns: [
        {
          title: '父模块',
          dataIndex: 'modulesKey',
          key: 'modulesKey',
          align: 'center',
        },
        {
          title: '子模块',
          dataIndex: 'subModulesKey',
          key: 'subModulesKey',
          align: 'center',
        },
        {
          title: '文案标识key',
          dataIndex: 'copyKey',
          key: 'copyKey',
          align: 'center',
        },
        {
          title: '语言类型',
          dataIndex: 'langKey',
          key: 'langKey',
          align: 'center',
        },
        {
          title: '文案',
          dataIndex: 'langText',
          key: 'langText',
          align: 'center',
        },
        {
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          align: 'center',
          render: (text: string, item: CopyWriting.QueryCopyWriting) => (
            <div>
              <Button
                type='link'
                onClick={() => {
                  editEvent(item);
                }}
              >
                编辑
              </Button>
              <Button
                type='link'
                onClick={() => {
                  deleteEvent(item as CopyWriting.DeleteCopyWriting);
                }}
              >
                删除
              </Button>
            </div>
          ),
        },
      ],
      dataSource: [],
    },
  });
  const [modulesNameList, setModulesNameList] =
    useState<Array<ModulesType.queryModules>>();
  const [subModulesNameList, setSubModulesNameList] =
    useState<Array<ModulesType.SubModulesItem>>();
  const [markList, setMarkList] = useState<Array<MarkType.MarkItem>>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formType, setFormType] = useState<ModulesType.FormType>('Edit');
  const [formData, setFormData] =
    useState<CopyWriting.CopyWritingFormDataType>();

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
      getCopyWritingList({
        modulesKey: res.data[0].modulesKey as string,
      });
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
    getCopyWritingList(form.getFieldsValue());
  };

  const getCopyWritingList = (params: CopyWriting.QueryCopyWriting) => {
    const { ...temp } = tableData;
    CopyWritingServices.queryCopyWriting(params).then((res) => {
      temp.data.dataSource = res?.data;
      setTableData(temp);
    });
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
    getCopyWritingList(form.getFieldsValue());
    setShowModal(false);
  };

  const editEvent = (item: CopyWriting.QueryCopyWriting) => {
    const { modulesKey, subModulesKey, copyKey } = item;
    CopyWritingServices.queryCopyWritingByCopyKey({
      modulesKey,
      subModulesKey,
      copyKey,
    }).then((res) => {
      clickFormEvent({ item: res.data, type: 'Edit' });
    });
  };

  /**
   * 删除指定文案
   * @param item
   */
  const deleteEvent = (item: CopyWriting.DeleteCopyWriting) => {
    CopyWritingServices.deleteCopyWriting(item).then((res) => {
      getCopyWritingList(form.getFieldsValue());
    });
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
        <Form.Item label='文案标识key' name='copyKey'>
          <Input />
        </Form.Item>
        <Form.Item
          label='语言类型'
          name='langKey'
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
        <Form.Item label='查询文案' name='langText'>
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
      <AntdTable data={tableData.data} />
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
