import React, { memo } from 'react';
import { Modal } from 'antd';
import { ProForm } from '@/common';

export const FormModal = memo((props: any) => {
  const { title, open, hideModal, ...restProps } = props;
  // const { type, initialValues, apiList, formList } = restProps
  return (
    open && (
      <Modal
        width={600}
        title={title}
        open={open}
        onCancel={() => hideModal()}
        footer={null}
      >
        <ProForm
          className="null"
          back={() => hideModal()}
          successCallback={() => hideModal()}
          formProps={{ formLayout: 'center' }}
          {...restProps}
        />
      </Modal>
    )
  );
});
