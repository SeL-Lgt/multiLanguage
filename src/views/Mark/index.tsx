import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import classnames, { space } from '~/tailwindcss-classnames';
import { AntdTable, TablePropsType } from '@/component/Common/CTable/ATable';
import LanguageIndexForm from '@/views/Mark/component/LanguageIndexForm';
import MarkServices from '@/api/mark';
import MarkType from '@/type/mark';

type ClickItemType = {
  item?: MarkType.MarkItem;
  type?: MarkType.FormType;
};

function LanguageIndexManagement() {
  const [tableData, setTableData] = useState<TablePropsType>({
    data: {
      columns: [
        {
          title: '语言标识Key',
          dataIndex: 'langKey',
          key: 'langKey',
          align: 'center',
        },
        {
          title: '对应国家语言',
          dataIndex: 'langText',
          key: 'langText',
          align: 'center',
        },
        {
          title: '用途',
          dataIndex: 'remark',
          key: 'remark',
          align: 'center',
        },
        {
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          align: 'center',
          render: (text: string, item: MarkType.MarkItem) => (
            <Button type='link' onClick={() => clickFormEvent({ item })}>
              编辑
            </Button>
          ),
        },
      ],
      dataSource: [],
    },
  });
  // 传给表单子组件的数据
  const [formData, setFormData] = useState<MarkType.MarkItem>({
    langKey: '',
    langText: '',
    remark: '',
  });
  // 表单类型---Edit：修改，New: 创建
  const [formType, setFormType] = useState<MarkType.FormType>('Edit');
  // 控制表单显示
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    getMarkList();
  }, []);

  /**
   * 获取列表信息
   */
  const getMarkList = () => {
    const { ...temp } = tableData;
    MarkServices.queryMarkList({ isUsed: true }).then((res) => {
      temp.data.dataSource = res?.data;
      setTableData(temp);
    });
  };

  /**
   * 点击表单事件处理
   * @param {MarkItem} [item = {langKey: '',langText: '',remark: ''}] 表单数据
   * @param {FormType} [type = 'Edit'] 表单展示类型
   */
  const clickFormEvent = ({
    item = { langKey: '', langText: '', remark: '' },
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
    getMarkList();
  };

  return (
    <div className={classnames(space('space-y-5'))}>
      <Button type='primary' onClick={() => clickFormEvent({ type: 'New' })}>
        新增语言
      </Button>
      <AntdTable data={tableData.data} />
      {showModal && (
        <LanguageIndexForm
          key={showModal.toString()}
          visible={showModal}
          closeEvent={closeModal}
          type={formType}
          formData={formData}
        />
      )}
    </div>
  );
}

export default LanguageIndexManagement;
