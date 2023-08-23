import React from 'react';
import { Dialog } from '@mui/material';

export const ModalWrapper = ({ open, handleClose, children }) => {
  return (
    <Dialog keepMounted open={open} onClose={handleClose}>
      {children}
    </Dialog>
  );
};
