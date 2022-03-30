import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';

type PropsType = {
  visible: boolean;
  closeEvent?: () => unknown;
};

function SonForm(props: PropsType) {
  const { visible, closeEvent } = props;
  const [isShow, setIsShow] = useState<boolean>(visible);
  const [form] = Form.useForm();

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
          label='子模块Key'
          name='submoduleKey'
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
