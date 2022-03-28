import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import classnames, { space } from '~/tailwindcss-classnames';
import { AntdTable, TablePropsType } from '@/component/Common/CTable/ATable';
import LanguageIndexForm, {
  FormDataType,
  TitleType,
} from '@/views/LanguageIndexManagement/component/form';

function LanguageIndexManagement() {
  const languageIndexFormRef = useRef(null);
  const [tableData, setTableData] = useState<TablePropsType>({
    data: {
      columns: [
        {
          title: '语言标识Key',
          dataIndex: 'keyId',
          key: 'keyId',
        },
        {
          title: '对应国家语言',
          dataIndex: 'language',
          key: 'language',
        },
        {
          title: '用途',
          dataIndex: 'application',
          key: 'application',
        },
        {
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          render: (text: string, item: object) => (
            <Button type='link' onClick={() => clickEven(item as FormDataType)}>
              操作
            </Button>
          ),
        },
      ],
      dataSource: [
        {
          keyId: '11',
          language: 'zh-CN',
          application: '1234124124',
        },
      ],
    },
  });
  const [formData, setFormData] = useState<FormDataType>();
  const [formType, setFormType] = useState<TitleType>('Edit');

  const clickEven = (item: FormDataType, type: TitleType = 'Edit') => {
    setFormData(item);
    setFormType(type);
    console.log(languageIndexFormRef.current);
  };

  return (
    <div className={classnames(space('space-y-5'))}>
      <Button type='primary'>新增语言</Button>
      <AntdTable data={tableData.data} />
      <LanguageIndexForm
        ref={languageIndexFormRef}
        type={formType}
        formData={formData}
      />
    </div>
  );
}

export default LanguageIndexManagement;
