import React, { useEffect, useState } from 'react';
import classnames, {
  alignItems,
  display,
  justifyContent,
  space,
  whitespace,
  width,
} from '~/tailwindcss-classnames';
import { Button, Input, Select } from 'antd';
import { AntdTable, TablePropsType } from '@/component/Common/CTable/ATable';
import { useNavigate } from 'react-router-dom';
import ParentForm from '@/views/Modules/component/ParentForm';
import ModulesType from '@/type/modules';
import ModulesServices from '@/api/modules';

type ClickItemType = {
  item?: ModulesType.ModulesItem;
  type?: ModulesType.FormType;
};

function Modules() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<TablePropsType>({
    data: {
      columns: [
        {
          title: '模块名字',
          dataIndex: 'modulesKey',
          key: 'modulesKey',
          align: 'center',
          render: (text: string, item: ModulesType.ModulesItem) => (
            <Button type='link' onClick={() => checkDetails(item)}>
              {text}
            </Button>
          ),
        },
        {
          title: '项目名字',
          dataIndex: 'modulesName',
          key: 'modulesName',
          align: 'center',
        },
        {
          title: '文案数量',
          dataIndex: 'number',
          key: 'number',
          align: 'center',
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
          align: 'center',
        },
        {
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          align: 'center',
          render: (text: string, item: ModulesType.ModulesItem) => (
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
  const [formData, setFormData] = useState<ModulesType.ModulesItem>({
    modulesKey: '',
    modulesName: '',
    remark: '',
  });
  // 表单类型---Edit：修改，New: 创建
  const [formType, setFormType] = useState<ModulesType.FormType>('Edit');
  // 控制表单显示
  const [showModal, setShowModal] = useState<boolean>(false);
  const [nameList, setNameList] = useState<Array<ModulesType.queryModules>>();

  useEffect(() => {
    queryModulesNameList();
    queryModulesList();
  }, []);

  /**
   * 访问详情
   * @param {object<ModulesType.ModulesItem>} item
   */
  const checkDetails = (item: ModulesType.ModulesItem) => {
    navigate(`/modules/detail/${item.modulesKey}`);
  };

  /**
   * 点击表单事件处理
   * @param {ModulesType.ModulesItem} [item = {keyId: '',language: '',application: ''}] 表单数据
   * @param {ModulesType.FormType} [type = 'Edit'] 表单展示类型
   */
  const clickFormEvent = ({
    item = {
      modulesKey: '',
      modulesName: '',
      remark: '',
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
    queryModulesNameList();
    queryModulesList();
    setShowModal(false);
  };

  /**
   * 查询列表详情
   */
  const queryModulesList = (params: ModulesType.queryModules = {}) => {
    const { ...temp } = tableData;
    ModulesServices.queryModulesList(params).then((res) => {
      temp.data.dataSource = res.data;
      setTableData(temp);
    });
  };

  /**
   * 查询父模块下拉详情
   */
  const queryModulesNameList = () => {
    ModulesServices.queryModulesNameList().then((res) => {
      setNameList(res.data);
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
    queryModulesList({
      modulesKey: value,
    });
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
          <Select
            showSearch
            allowClear
            onChange={modulesNameChange}
            className={classnames(width('w-52'))}
          >
            {modulesNameSelectView()}
          </Select>
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

export default Modules;
