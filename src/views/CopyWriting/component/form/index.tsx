import React, { useEffect, useState } from 'react';
import CopyWriting from '@/type/copyWriting';
import { Button, Form, Input, Modal, Select, Space } from 'antd';
import classnames, {
  justifyContent,
  maxHeight,
  overflow,
  padding,
} from '~/tailwindcss-classnames';
import MarkType from '@/type/mark';
import MarkServices from '@/api/mark';
import ModulesServices from '@/api/modules';
import ModulesType from '@/type/modules';
import CopyWritingServices from '@/api/copyWriting';

type PropsType = {
  type: CopyWriting.FormType;
  formData: unknown;
  visible: boolean;
  closeEvent?: () => unknown;
};

function CopyWritingForm(props: PropsType) {
  const { visible, type, formData, closeEvent } = props;
  const [isShow, setIsShow] = useState<boolean>(visible);
  // 对话框标题
  const [title, setTitle] = useState<string>('');
  const [form] = Form.useForm();
  const [markList, setMarkList] = useState<Array<MarkType.MarkItem>>();
  const [subModulesNameList, setSubModulesNameList] =
    useState<Array<ModulesType.SubModulesItem>>();

  const [devKey, setDevKey] = useState<string | null>();

  useEffect(() => {
    setTitle(type === 'Edit' ? '修改语言信息' : '新增语言信息');
    form.setFieldsValue(formData);
    queryUsedMarkList();
    querySubModulesNameList(form.getFieldsValue().modulesKey);
  }, []);

  /**
   * 关闭对话框
   * @callback closeEvent 调用父级方法
   */
  const closeModal = () => {
    setIsShow(false);
    if (closeEvent) {
      closeEvent();
    }
  };

  /**
   * 提交表单，成功后关闭对话框
   */
  const okModal = () => {
    form
      .validateFields()
      .then((res) => {
        CopyWritingServices.addCopyWriting(res).then(() => {
          closeModal();
        });
      })
      .catch((error) => {
        console.log(error);
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
    resetForm();
    setDevKey(null);
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

  const langKeyChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    const { subModulesKey } = form.getFieldsValue();
    setDevKey(value ? `${subModulesKey}.${value}` : null);
  };

  const resetForm = () => {
    const data = {
      modulesKey: form.getFieldsValue().modulesKey,
      subModulesKey: form.getFieldsValue().subModulesKey,
      copyKey: null,
      langList: [
        {
          langKey: null,
          langText: null,
        },
      ],
    };
    form.setFieldsValue(data);
  };

  return (
    <Modal
      forceRender
      visible={isShow}
      title={title}
      onOk={okModal}
      onCancel={closeModal}
      width='40%'
    >
      <div
        className={classnames(
          maxHeight('max-h-96'),
          overflow('overflow-auto'),
          padding('pr-5'),
        )}
      >
        <Form
          name='copyWritingForm'
          layout='horizontal'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          form={form}
        >
          <Form.Item
            label='归属模块'
            name='modulesKey'
            rules={[
              {
                required: true,
                message: '请选择归属模块',
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label='归属子模块'
            name='subModulesKey'
            rules={[
              {
                required: true,
                message: '请选择归属子模块',
              },
            ]}
          >
            <Select
              disabled={type === 'Edit'}
              showSearch
              onChange={subModulesNameChange}
            >
              {subModulesNameSelectView()}
            </Select>
          </Form.Item>
          <Form.Item
            label='文案标识key'
            name='copyKey'
            rules={[
              {
                required: true,
                message: '请输入文案标识',
              },
            ]}
            extra={devKey && `开发所用Key值：${devKey}`}
          >
            <Input
              disabled={!form.getFieldsValue().subModulesKey || type === 'Edit'}
              onChange={langKeyChange}
            />
          </Form.Item>
          <Form.List name='langList'>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <div key={field.key}>
                    <Form.Item
                      label='语言类型'
                      name={[field.name, 'langKey']}
                      rules={[
                        {
                          required: true,
                          message: '请选择语言类型',
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        onChange={markSelectChange}
                        optionFilterProp='children'
                      >
                        {markSelectView()}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label='语言文案'
                      name={[field.name, 'langText']}
                      rules={[
                        {
                          required: true,
                          message: '请输入语言文案',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <Form.Item className={justifyContent('justify-end')}>
                        <Button onClick={() => remove(field.name)}>
                          删除上方语言类型
                        </Button>
                      </Form.Item>
                    ) : null}
                  </div>
                ))}
                <Form.Item className={justifyContent('justify-center')}>
                  <Button type='primary' onClick={() => add()} block>
                    新增语言文案
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </div>
    </Modal>
  );
}

export default CopyWritingForm;
