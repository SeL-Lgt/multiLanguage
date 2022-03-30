import React, { useState } from 'react';
import classnames, {
  alignItems,
  display,
  justifyContent,
  space,
  whitespace,
} from '~/tailwindcss-classnames';
import { Button, Input } from 'antd';
import { AntdTable, TablePropsType } from '@/component/Common/CTable/ATable';
import { useNavigate } from 'react-router-dom';
import ParentForm from '@/views/ProjectManagement/component/ParentForm';
import { ModulesDetailType, FormType } from '@/views/ProjectManagement/index.d';

type ClickItemType = {
  item?: ModulesDetailType;
  type?: FormType;
};

function ProjectManagement() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<TablePropsType>({
    data: {
      columns: [
        {
          title: '模块名字',
          dataIndex: 'modulesKey',
          key: 'modulesKey',
          align: 'center',
          render: (text: string, item: ModulesDetailType) => (
            <Button type='link' onClick={() => checkDetails(item)}>
              {text}
            </Button>
          ),
        },
        {
          title: '项目名字',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
        },
        {
          title: '文案数量',
          dataIndex: 'number',
          key: 'number',
          align: 'center',
        },
        {
          title: '开放语言',
          dataIndex: 'language',
          key: 'language',
          align: 'center',
        },
        {
          title: '备注',
          dataIndex: 'mark',
          key: 'mark',
          align: 'center',
        },
        {
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          align: 'center',
          render: (text: string, item: ModulesDetailType) => (
            <Button type='link' onClick={() => clickFormEvent({ item })}>
              编辑
            </Button>
          ),
        },
      ],
      dataSource: [
        {
          modulesKey: 'DMS-PC',
          name: '1123',
          number: '1123',
          language: '1123',
          mark: '1123',
        },
      ],
    },
  });
  // 传给表单子组件的数据
  const [formData, setFormData] = useState<ModulesDetailType>({
    modulesKey: '',
    name: '',
    number: '',
    language: '',
    mark: '',
  });
  // 表单类型---Edit：修改，New: 创建
  const [formType, setFormType] = useState<FormType>('Edit');
  // 控制表单显示
  const [showModal, setShowModal] = useState<boolean>(false);

  /**
   * 访问详情
   * @param {object<ModulesDetailType>} item
   */
  const checkDetails = (item: ModulesDetailType) => {
    navigate(`/projectManagement/detail/${item.modulesKey}`);
  };

  /**
   * 点击表单事件处理
   * @param {ModulesDetailType} [item = {keyId: '',language: '',application: ''}] 表单数据
   * @param {FormType} [type = 'Edit'] 表单展示类型
   */
  const clickFormEvent = ({
    item = {
      modulesKey: '',
      name: '',
      number: '',
      language: '',
      mark: '',
    },
    type = 'Edit',
  }: ClickItemType) => {
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
    <div className={classnames(space('space-y-5'))}>
      <div
        className={classnames(
          display('flex'),
          justifyContent('justify-between'),
          alignItems('items-center'),
        )}
      >
        <div
          className={classnames(
            display('flex'),
            alignItems('items-center'),
            whitespace('whitespace-pre'),
          )}
        >
          <div>查询模块：</div>
          <Input />
        </div>
        <Button type='primary' onClick={() => clickFormEvent({ type: 'New' })}>
          新增父模块
        </Button>
      </div>
      <AntdTable data={tableData.data} />
      <ParentForm
        key={showModal.toString()}
        type={formType}
        formData={formData}
        visible={showModal}
        closeEvent={closeModal}
      />
    </div>
  );
}

export default ProjectManagement;
