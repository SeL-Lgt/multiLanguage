import { Form, Input, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import ModulesType from '@/type/modules';
import ModulesServices from '@/api/modules';

type PropsType = {
  visible: boolean;
  closeEvent?: () => unknown;
  modulesKey?: ModulesType.ModulesKey;
};

function SonForm(props: PropsType) {
  const { visible, closeEvent, modulesKey } = props;
  const [isShow, setIsShow] = useState<boolean>(visible);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      modulesKey,
    });
  });

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
      .then((value) => {
        ModulesServices.addSubModules(value).then((res) => {
          if (res.status === 200) {
            message.success(res.message, 2);
            closeModal();
          } else {
            message.error(res.message, 2);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal
      forceRender
      visible={isShow}
      title='新增子模块'
      onOk={okModal}
      onCancel={closeModal}
    >
      <Form
        name='sonForm'
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
              message: '请输入模块Key',
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label='子模块Key'
          name='subModulesKey'
          rules={[
            {
              required: true,
              message: '请输入子模块Key',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default SonForm;
