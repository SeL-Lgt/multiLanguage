import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

export type TitleType = 'Edit' | 'New';
export type FormDataType = {
  keyId: string;
  language: string;
  application: string;
};

interface PropsType extends React.RefAttributes<unknown> {
  type: TitleType;
  formData?: FormDataType;
}

export default function LanguageIndexForm(props: PropsType) {
  const { type, formData, ref } = props;
  const [isShow, setIsShow] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  useImperativeHandle(ref, () => {
    changeShow();
  });

  useEffect(() => {
    setTitle(type === 'Edit' ? '修改语言信息' : '新增语言信息');
  }, []);

  const changeShow = () => {
    setIsShow(!isShow);
  };

  return (
    <Modal visible={isShow} title={title}>
      <div>{formData}</div>
    </Modal>
  );
}

LanguageIndexForm.propTypes = {
  type: PropTypes.string,
  formData: PropTypes.instanceOf(Object),
};

LanguageIndexForm.defaultProps = {
  type: 'Edit',
  formData: {},
};
