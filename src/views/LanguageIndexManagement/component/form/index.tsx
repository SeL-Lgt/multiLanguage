import React, {
  ForwardedRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Modal } from 'antd';

export type TitleType = 'Edit' | 'New';
export type FormDataType = {
  keyId: string;
  language: string;
  application: string;
};

interface PropsType {
  type: TitleType;
  formData?: FormDataType;
}

const LanguageIndexForm = React.forwardRef(
  (props: PropsType, ref: ForwardedRef<unknown>) => {
    const { type, formData } = props;
    const [isShow, setIsShow] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');

    useImperativeHandle(
      ref,
      () => ({
        show: () => changeShow(),
      }),
      [],
    );

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
  },
);

export default LanguageIndexForm;
