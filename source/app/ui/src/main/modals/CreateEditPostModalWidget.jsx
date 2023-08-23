import React from 'react';
import { Field } from 'react-final-form';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import { ErrorList } from '../../common/components/ErrorList';
import { RenderTextField } from '../../common/fields/RenderTextField';
import { LabelButton } from '../../common/inputs/LabelButton';

export const CreateEditPostModalWidget = ({
  labels,
  onSubmit,
  onClose,
  loading,
  error,
}) => {
  return (
    <React.Fragment>
      <DialogTitle>{labels.modalTile}</DialogTitle>
      <DialogContent>
        <ErrorList errors={error} />
        <Field
          name="title"
          component={RenderTextField}
          label={labels.title}
          fullWidth={true}
          disabled={loading}
          variant="standard"
          size="small"
        />
        <Field
          name="post"
          component={RenderTextField}
          label={labels.post}
          fullWidth={true}
          disabled={loading}
          variant="standard"
          size="small"
          maxRows={10}
          minRows={2}
          multiline={true}
        />
        <Field
          name="image"
          component={RenderTextField}
          label={labels.image}
          fullWidth={true}
          disabled={loading}
          variant="standard"
          size="small"
        />
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          color="primary"
          onClick={onClose}
          disabled={loading}
        >
          <LabelButton label={labels.close} />
        </Button>
        <Button
          type="submit"
          color="primary"
          onClick={onSubmit}
          disabled={loading}
        >
          <LabelButton loading={loading} label={labels.save} />
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};
