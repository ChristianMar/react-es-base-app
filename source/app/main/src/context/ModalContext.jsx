import React, { createContext, useState } from 'react';

import { ModalWrapper } from '@ui/main/modals/ModalWrapper';
import { CreatePostModal } from '@main/components/modals/CreatePostModal';
import { EditPostModal } from '@main/components/modals/EditPostModal';
import { ConfirmModal } from '@main/components/modals/ConfirmModal';

export const ModalContext = createContext({
  handleOpen: (arg0, arg1) => {
    return;
  },
  handleClose: () => {
    return;
  },
});

export const ModalContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [options, setOptions] = useState({});

  const handleOpen = (type, opt) => {
    setType(type);
    if (opt) setOptions(opt);
    setOpen(true);
  };

  const handleClose = () => {
    setType('');
    setOptions({});
    setOpen(false);
  };

  const getModal = () => {
    switch (type) {
      case 'CREATE_POST':
        return <CreatePostModal handleClose={handleClose} />;
      case 'EDIT_POST':
        return <EditPostModal handleClose={handleClose} options={options} />;
      case 'CONFIRM':
        return <ConfirmModal />;

      default:
        return <div />;
    }
  };

  return (
    <ModalContext.Provider
      value={{
        handleOpen: handleOpen,
        handleClose: handleClose,
      }}
    >
      {children}
      <ModalWrapper open={open} handleClose={handleClose}>
        {getModal()}
      </ModalWrapper>
    </ModalContext.Provider>
  );
};
