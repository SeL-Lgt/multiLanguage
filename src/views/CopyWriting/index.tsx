import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Input, message, Select, Upload } from 'antd';
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
import type { RcFile, UploadRequestOption } from 'rc-upload/lib/interface';
import TimeUtil from '@/utils/timeUtil';

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
          title: '开发所使用的key',
          dataIndex: 'devKey',
          key: 'devKey',
          align: 'center',
          render: (text: string, item: CopyWriting.QueryCopyWriting) => (
            <Button
              type='link'
              onClick={() =>
                copyDevKey(`${item.subModulesKey}.${item.copyKey}`)
              }
            >{`${item.subModulesKey}.${item.copyKey}`}</Button>
          ),
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
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    total: 0,
  });

  /**
   * 初始化加载
   * 获取父模块列表、允许使用的语言列表
   */
  useEffect(() => {
    queryModulesNameList();
    queryUsedMarkList();
  }, []);

  /**
   * 监听父模块选择变更
   * 父模块数值改变，获取对应子模块，且重置页码
   */
  useEffect(() => {
    const { modulesKey } = form.getFieldsValue();
    if (modulesKey) {
      modulesNameChange(modulesKey);
      querySubModulesNameList(modulesKey);
      getCopyWritingList();
    }
  }, [form.getFieldsValue().modulesKey]);

  /**
   * 监听页码变更
   * 由于父模块改变时，已经进行一次请求，此时页码为1，防止重复请求，进行过滤
   */
  useEffect(() => {
    const { modulesKey } = form.getFieldsValue();
    if (modulesKey) {
      getCopyWritingList();
    }
  }, [pagination.current]);

  /**
   * 查询父模块下拉详情
   */
  const queryModulesNameList = () => {
    ModulesServices.queryModulesNameList().then((res) => {
      setModulesNameList(res.data);
      form.setFieldsValue({
        modulesKey: res.data[0].modulesKey,
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
    form.setFieldsValue({
      subModulesKey: null,
    });
    pageInit();
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
      setMarkList(res.data.row);
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
   * 重置查询
   */
  const resetEvent = () => {
    const defaultModulesKey = form.getFieldsValue().modulesKey;
    form.setFieldsValue({
      modulesKey: defaultModulesKey,
      subModulesKey: null,
      copyKey: null,
      langKey: null,
      langText: null,
    });
    if (pagination.current === 1) {
      getCopyWritingList();
    } else {
      pageInit();
    }
  };

  /**
   * 条件查询列表
   */
  const onSearch = () => {
    if (pagination.current === 1) {
      getCopyWritingList();
    } else {
      pageInit();
    }
  };

  /**
   * 获取列表数据
   */
  const getCopyWritingList = () => {
    const { ...temp } = tableData;
    const params = { ...form.getFieldsValue(), ...pagination };
    CopyWritingServices.queryCopyWriting(params).then((res) => {
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
    getCopyWritingList();
    setShowModal(false);
  };

  /**
   * 修改文案
   * @param item
   */
  const editEvent = (item: CopyWriting.QueryCopyWriting) => {
    const { modulesKey, subModulesKey, copyKey } = item;
    CopyWritingServices.queryCopyWritingByCopyKey({
      modulesKey,
      subModulesKey,
      copyKey,
    }).then((res) => {
      clickFormEvent({
        item: res.data,
        type: 'Edit',
      });
    });
  };

  /**
   * 删除指定文案
   * @param item
   */
  const deleteEvent = (item: CopyWriting.DeleteCopyWriting) => {
    CopyWritingServices.deleteCopyWriting(item).then((res) => {
      getCopyWritingList();
    });
  };

  /**
   * 复制开发Key文案
   * @param value
   */
  const copyDevKey = (value: string) => {
    // navigator clipboard 需要https等安全上下文
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(() => {
        message.success(`已复制文案${value}`);
      });
    } else {
      // 创建text area
      const textArea = document.createElement('textarea');
      textArea.value = value;
      // 使text area不在viewport，同时设置不可见
      textArea.style.position = 'absolute';
      textArea.style.opacity = '0';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      // 执行复制命令并移除文本框
      document.execCommand('copy');
      message.success(`已复制文案${value}`);
      textArea.remove();
    }
  };

  /**
   * 校验是否为excel
   * @param file
   */
  const checkExcel = (file: RcFile) => {
    const pattern = /(\.xls|\.xlsx)$/;
    return pattern.test(file.name);
  };

  /**
   * 上传文案
   * @param file
   */
  const uploadCopy = (file: UploadRequestOption) => {
    const { modulesKey } = form.getFieldsValue();
    const temp = new FormData();
    temp.append('file', file.file);
    temp.append('modulesKey', modulesKey);
    CopyWritingServices.uploadCopyWriting(temp).then((res) => {
      switch (res.status) {
        case 200:
          getCopyWritingList();
          message.success(res.message, 2);
          if (res.data.errorList.length > 0) {
            downloadCopy({
              modulesKey,
              type: 'error',
              data: res.data.errorList,
            } as CopyWriting.DownLoadWriting<any>);
          }
          break;
        default:
          message.error(res.message, 2);
      }
    });
  };

  /**
   * 下载文案
   * @param item
   */
  const downloadCopy = (item: CopyWriting.DownLoadWriting<any>) => {
    const { modulesKey, type } = item;
    CopyWritingServices.downloadCopyWriting(item).then((res) => {
      if (res?.status === 500) {
        message.error(res.message, 2);
      } else {
        const blob = new Blob([res as unknown as Blob], {
          type: 'application/vnd.ms-excel',
        });
        const objectUrl = URL.createObjectURL(blob);
        const fileName = `${
          type === 'error' ? '错误文案-' : ''
        }${modulesKey}-${TimeUtil.timeFormat({
          format: 'YYYY-MM-DD HH:mm:ss',
        })}.xlsx`;
        const a = document.createElement('a');
        a.setAttribute('href', objectUrl);
        a.setAttribute('download', fileName);
        a.click();
      }
    });
  };

  /**
   * 下载导入文案模板
   */
  const downloadDefaultCopyExcel = () => {
    CopyWritingServices.downloadDefaultCopyExcel().then((res) => {
      if (res?.status === 500) {
        message.error(res.message, 2);
      } else {
        const blob = new Blob([res as unknown as Blob], {
          type: 'application/vnd.ms-excel',
        });
        const objectUrl = URL.createObjectURL(blob);
        const fileName = '导入文案模板.xlsx';
        const a = document.createElement('a');
        a.setAttribute('href', objectUrl);
        a.setAttribute('download', fileName);
        a.click();
      }
    });
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

  /**
   * 分页初始化
   */
  const pageInit = () => {
    setPagination({
      pageSize: 10,
      current: 1,
      total: 0,
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
        <Button onClick={resetEvent}>重置</Button>
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
          <div>
            <Button type='link' onClick={downloadDefaultCopyExcel}>
              导入文案模板
            </Button>
            <Upload
              showUploadList={false}
              beforeUpload={checkExcel}
              customRequest={uploadCopy}
            >
              <Button type='primary'>导入文案</Button>
            </Upload>
          </div>
          <Button
            onClick={() =>
              downloadCopy({
                modulesKey: form.getFieldsValue().modulesKey,
                type: 'inquiry',
              })
            }
          >
            导出文案
          </Button>
        </div>
      </div>
      <AntdTable
        data={tableData.data}
        pagination={pagination}
        pageChange={pageChange}
      />
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
