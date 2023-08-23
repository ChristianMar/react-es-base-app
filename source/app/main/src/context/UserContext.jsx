import React, { useEffect, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { deleteState } from '../utils/reduxSyncStorage';
import { logout, selectCurrentUser } from '../store/slices/userSlice';

export const UserContext = createContext({
  onLogout: () => {
    return;
  },
});

export const UserContextProvider = ({ children }) => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    deleteState();
    dispatch(logout());
    setTimeout(() => {
      navigate('/');
    }, 100);
  };

  const onNavigate = () => {
    if (!user.token) {
      deleteState();
      navigate('/');
    }
  };

  useEffect(() => {
    onNavigate();
  }, []);

  useEffect(() => {
    if (!user.token) {
      deleteState();
      navigate('/');
    } else if (location.pathname === '/') navigate('app/posts');
  }, [user.token]);

  useEffect(() => {
    onNavigate();
  }, [window.location.hash]);

  return (
    <UserContext.Provider
      value={{
        onLogout: onLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
