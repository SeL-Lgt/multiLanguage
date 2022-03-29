import React, { useState } from 'react';
import { Button } from 'antd';
import classnames, { space } from '~/tailwindcss-classnames';
import { AntdTable, TablePropsType } from '@/component/Common/CTable/ATable';
import LanguageIndexForm, {
  FormDataType,
  TitleType,
} from '@/views/LanguageIndexManagement/component/LanguageIndexForm';

type ClickItemType = {
  item?: FormDataType;
  type?: TitleType;
};

function LanguageIndexManagement() {
  const [tableData, setTableData] = useState<TablePropsType>({
    data: {
      columns: [
        {
          title: '语言标识Key',
          dataIndex: 'keyId',
          key: 'keyId',
          align: 'center',
        },
        {
          title: '对应国家语言',
          dataIndex: 'language',
          key: 'language',
          align: 'center',
        },
        {
          title: '用途',
          dataIndex: 'application',
          key: 'application',
          align: 'center',
        },
        {
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          align: 'center',
          render: (text: string, item: FormDataType) => (
            <Button type='link' onClick={() => clickFormEvent({ item })}>
              操作
            </Button>
          ),
        },
      ],
      dataSource: [
        {
          keyId: 'zh-CN',
          language: '中国(简体)',
          application: '1231241',
        },
      ],
    },
  });
  // 传给表单子组件的数据
  const [formData, setFormData] = useState<FormDataType>({
    keyId: '',
    language: '',
    application: '',
  });
  // 表单类型---Edit：修改，New: 创建
  const [formType, setFormType] = useState<TitleType>('Edit');
  // 控制表单显示
  const [showModal, setShowModal] = useState<boolean>(false);

  /**
   * 点击表单事件处理
   * @param {FormDataType} [item = {keyId: '',language: '',application: ''}] 表单数据
   * @param {TitleType} [type = 'Edit'] 表单展示类型
   */
  const clickFormEvent = ({
    item = {
      keyId: '',
      language: '',
      application: '',
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
      <Button type='primary' onClick={() => clickFormEvent({ type: 'New' })}>
        新增语言
      </Button>
      <AntdTable data={tableData.data} />
      <LanguageIndexForm
        key={showModal.toString()}
        visible={showModal}
        closeEvent={closeModal}
        type={formType}
        formData={formData}
      />
    </div>
  );
}

export default LanguageIndexManagement;
