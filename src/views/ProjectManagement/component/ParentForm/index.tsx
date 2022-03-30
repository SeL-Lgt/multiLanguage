import React, { useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import { FormType, ModulesDetailType } from '@/views/ProjectManagement/index.d';

type PropsType = {
  type: FormType;
  formData: ModulesDetailType;
  visible: boolean;
  closeEvent?: () => unknown;
};

function ParentForm(props: PropsType) {
  const { visible, type, formData, closeEvent } = props;
  const [isShow, setIsShow] = useState<boolean>(visible);
  // 对话框标题
  const [title, setTitle] = useState<string>('');
  const [form] = Form.useForm();

  useEffect(() => {
    setTitle(type === 'Edit' ? '修改父模块信息' : '新增父模块信息');
    form.setFieldsValue(formData);
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
        console.log(res);
        closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal
      forceRender
      visible={isShow}
      title={title}
      onOk={okModal}
      onCancel={closeModal}
    >
      <Form
        name='parentForm'
        layout='horizontal'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
      >
        <Form.Item
          label='模块Key'
          name='modulesKey'
          rules={[
            {
              required: true,
              message: '请选择模块Key',
            },
          ]}
        >
          <Input disabled={type === 'Edit'} />
        </Form.Item>
        <Form.Item
          label='项目名字'
          name='name'
          rules={[
            {
              required: true,
              message: '请选择项目名字',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='开放语言'
          name='language'
          rules={[
            {
              required: true,
              message: '请选择开放语言',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='备注' name='mark'>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ParentForm;
