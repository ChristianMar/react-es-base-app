import React from 'react';
import { Button } from '@mui/material';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import { useTranslate } from 'react-polyglot';

import { ErrorList } from '../../common/components/ErrorList';
import { Spinner } from '../../common/components/Spinner';
import { LoadMore, BackButton } from './UIPosts';
import { LabelButton } from '../../common/inputs/LabelButton';
import { UserItem } from '../users/UserItem';

export const PostsList = ({
  loading,
  error,
  children,
  hasNext,
  hasPrev,
  loadNextPosts,
  loadPrevPosts,
  user,
  onGoBack,
}) => {
  const t = useTranslate();
  return (
    <React.Fragment>
      <ErrorList errors={error} />
      {!onGoBack ? null : (
        <BackButton>
          <Button startIcon={<ArrowBackIos />} onClick={onGoBack}>
            {t('common.back')}
          </Button>
        </BackButton>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {!user ? null : <UserItem user={user} />}
          {children}
          <LoadMore>
            <Button onClick={loadPrevPosts} disabled={!hasPrev}>
              <LabelButton label={t('common.prev')} />
            </Button>
            <Button onClick={loadNextPosts} disabled={!hasNext}>
              <LabelButton label={t('common.next')} />
            </Button>
          </LoadMore>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
