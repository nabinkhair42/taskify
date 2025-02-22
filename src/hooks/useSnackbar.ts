import { useState } from 'react';
import { AlertColor } from '@mui/material';

export const useSnackbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<AlertColor>('success');

  const showSnackbar = (message: string, type: AlertColor = 'success') => {
    setMessage(message);
    setType(type);
    setOpen(true);
  };

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return {
    open,
    message,
    type,
    showSnackbar,
    handleClose,
  };
}; 