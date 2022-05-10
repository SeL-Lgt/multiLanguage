import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'antd';
import classnames, {
  alignItems,
  display,
  fontSize,
  fontWeight,
  space,
} from '~/tailwindcss-classnames';
import { AntdTable, TablePropsType } from '@/component/Common/CTable/ATable';
import SonForm from '@/views/Modules/component/SonForm';
import ModulesServices from '@/api/modules';
import ModulesType from '@/type/modules';

function ModulesDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<TablePropsType>({
    config: {},
    data: {
      columns: [
        {
          title: '子模块Key',
          dataIndex: 'subModulesKey',
          key: 'subModulesKey',
          align: 'center',
        },
        {
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          align: 'center',
          render: (text: string, item: ModulesType.SubModulesItem) => (
            <Button type='link' onClick={() => deleteModule(item)}>
              删除
            </Button>
          ),
        },
      ],
      dataSource: [],
    },
  });
  // 控制表单显示
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    total: 0,
  });
  const modulesKey: ModulesType.ModulesKey | undefined = params.id;

  useEffect(() => {
    getSubModulesList();
  }, [pagination.current]);

  const getSubModulesList = () => {
    const { ...temp } = tableData;
    const rep = { ...pagination, modulesKey };
    ModulesServices.querySubModulesList(rep).then((res) => {
      const { row, current, pageSize, total } = res.data;
      temp.data.dataSource = row;
      setPagination({
        current,
        pageSize,
        total,
      });
      setTableData(temp);
    });
  };

  /**
   * 返回上一页
   */
  const back = () => {
    navigate(-1);
  };

  /**
   * 删除模块
   * @param item
   */
  const deleteModule = (item: ModulesType.SubModulesItem) => {
    ModulesServices.deleteSubModules(item).then(() => {
      getSubModulesList();
    });
  };

  /**
   * 打开子模块对话框
   */
  const openModal = () => {
    setShowModal(true);
  };

  /**
   * 关闭对话框
   */
  const closeModal = () => {
    getSubModulesList();
    setShowModal(false);
  };

  /**
   * 分页改变
   * @param page
   * @param pageSize
   */
  const pageChange = (page: number, pageSize: number) => {
    setPagination({
      pageSize,
      current: page,
      total: pagination.total,
    });
  };

  return (
    <div className={classnames(space('space-y-5'))}>
      <div
        className={classnames(
          display('flex'),
          alignItems('items-center'),
          space('space-x-2'),
        )}
      >
        <Button type='primary' onClick={back}>
          返回
        </Button>
        <div className={classnames(fontSize('text-base'))}>
          当前所选模块：
          <span className={classnames(fontWeight('font-bold'))}>
            {modulesKey}
          </span>
        </div>
      </div>
      <Button type='primary' onClick={openModal}>
        新增子模块
      </Button>
      <AntdTable
        data={tableData.data}
        config={tableData.config}
        pagination={pagination}
        pageChange={pageChange}
      />
      <SonForm
        key={showModal.toString()}
        visible={showModal}
        closeEvent={closeModal}
        modulesKey={modulesKey}
      />
    </div>
  );
}

export default ModulesDetail;
