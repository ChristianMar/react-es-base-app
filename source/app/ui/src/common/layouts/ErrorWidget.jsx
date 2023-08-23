import React from 'react';
import { Button } from '@mui/material';

import { CenteredWidget } from '../containers/CenteredWidget';
import { LabelButton } from '../inputs/LabelButton';

export const ErrorWidget = ({ labels, onLogout, loading }) => {
  return (
    <CenteredWidget>
      {labels.error}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth={true}
        onClick={onLogout}
      >
        <LabelButton loading={loading} label={labels.goHome} />
      </Button>
    </CenteredWidget>
  );
};
