import React, { memo } from 'react';
import { Modal } from 'antd';
import { ProForm } from '@/common';

export const FormModal = memo((props: any) => {
  const { title, open, hieModal, ...restProps } = props;
  // const { type, initialValues, apiList, formList } = restProps
  return (
    open && (
      <Modal
        width={600}
        title={title}
        open={open}
        onCancel={() => hieModal()}
        footer={null}
      >
        <ProForm
          className="null"
          back={() => hieModal()}
          successCallback={() => hieModal()}
          formProps={{ formLayout: 'center' }}
          {...restProps}
        />
      </Modal>
    )
  );
});