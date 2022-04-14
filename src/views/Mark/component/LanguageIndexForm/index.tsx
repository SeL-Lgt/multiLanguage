import React, { Attributes, useEffect, useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import MarkServices from '@/api/mark';
import MarkType from '@/type/mark';

interface PropsType extends Attributes {
  type: MarkType.FormType;
  visible: boolean;
  formData?: MarkType.MarkItem;
  closeEvent?: () => unknown;
}

function LanguageIndexForm(props: PropsType) {
  const { type, formData, visible, closeEvent } = props;
  const [isShow, setIsShow] = useState<boolean>(visible);
  // 对话框标题
  const [title, setTitle] = useState<string>('');
  const [languageList, setLanguageList] = useState<Array<MarkType.MarkItem>>();
  const [form] = Form.useForm();

  useEffect(() => {
    setTitle(type === 'Edit' ? '修改语言信息' : '新增语言信息');

    MarkServices.queryMarkList({
      isUsed: type === 'Edit',
    }).then((res) => {
      setLanguageList(res.data);
    });
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
      .then((res: MarkType.MarkItem) => {
        switch (type) {
          case 'Edit':
            MarkServices.updateMark(res).then(() => {
              closeModal();
            });
            break;
          default:
            MarkServices.addMark(res).then(() => {
              closeModal();
            });
        }
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
    const optionView = languageList?.map((item) => (
      <Select.Option key={item.langKey} value={item.langText}>
        {item.langText}
      </Select.Option>
    ));
    return optionView;
  };

  const languageSelectChange = (value: string, { ...item }) => {
    form.setFieldsValue({
      langKey: item.key,
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
          name='langText'
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
          name='langKey'
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
          name='remark'
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
