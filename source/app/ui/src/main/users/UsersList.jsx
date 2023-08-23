import React from 'react';
import { Button } from '@mui/material';
import { useTranslate } from 'react-polyglot';

import { ErrorList } from '../../common/components/ErrorList';
import { Spinner } from '../../common/components/Spinner';
import { LoadMore } from './UIUsers';
import { LabelButton } from '../../common/inputs/LabelButton';

export const UsersList = ({
  loading,
  error,
  children,
  hasNext,
  hasPrev,
  loadNextUsers,
  loadPrevUsers,
}) => {
  const t = useTranslate();
  return (
    <React.Fragment>
      <ErrorList errors={error} />
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {children}
          <LoadMore>
            <Button onClick={loadPrevUsers} disabled={!hasPrev}>
              <LabelButton label={t('common.prev')} />
            </Button>
            <Button onClick={loadNextUsers} disabled={!hasNext}>
              <LabelButton label={t('common.next')} />
            </Button>
          </LoadMore>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
