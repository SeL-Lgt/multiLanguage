import React, { Attributes, useEffect, useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import languageUtil from '@/utils/languageUtil';
import {
  FormDataType,
  FormType,
} from '@/views/LanguageIndexManagement/index.d';

const { Option } = Select;

interface PropsType extends Attributes {
  type: FormType;
  visible: boolean;
  formData?: FormDataType;
  closeEvent?: () => unknown;
}

function LanguageIndexForm(props: PropsType) {
  const { type, formData, visible, closeEvent } = props;
  const [isShow, setIsShow] = useState<boolean>(visible);
  // 对话框标题
  const [title, setTitle] = useState<string>('');
  const [form] = Form.useForm();

  useEffect(() => {
    setTitle(type === 'Edit' ? '修改语言信息' : '新增语言信息');
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

  /**
   * 语言列表下拉框
   * @return {Array<Element>} Option标签
   */
  const languageSelectView = () => {
    const languageList = languageUtil.getList();
    const optionView = languageList.map((item) => (
      <Option key={item.key} value={item.text}>
        {item.text}
      </Option>
    ));
    return optionView;
  };

  const languageSelectChange = (value: string) => {
    form.setFieldsValue({
      keyId: languageUtil.findOfName(value)?.key,
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
        name='languageForm'
        layout='horizontal'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
      >
        <Form.Item
          label='对应国家语言'
          name='language'
          rules={[
            {
              required: true,
              message: '请选择对应国家语言',
            },
          ]}
        >
          <Select
            showSearch
            onChange={languageSelectChange}
            optionFilterProp='children'
            disabled={type === 'Edit'}
          >
            {languageSelectView()}
          </Select>
        </Form.Item>
        <Form.Item
          label='语言标识'
          name='keyId'
          rules={[
            {
              required: true,
              message: '请选择对应语言标识',
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label='用途描述'
          name='application'
          rules={[
            {
              required: true,
              message: '请补充用途描述',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default LanguageIndexForm;
