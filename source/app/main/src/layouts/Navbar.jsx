import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useTranslate } from 'react-polyglot';
import { useNavigate } from 'react-router-dom';

import { Navbar as NavbarUI } from '@ui/common/navigation/Navbar';
import { selectCurrentUser } from '../store/slices/userSlice';
import { MENU, USER_MENU } from '../config';
import { UserContext } from '../context/UserContext';
import { ModalContext } from '../context/ModalContext';

export const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const userContext = useContext(UserContext);
  const modalContext = useContext(ModalContext);
  const t = useTranslate();
  const navigate = useNavigate();

  const onMenuClick = (id) => {
    switch (id) {
      case 'profile':
        navigate('/app/profile', {
          state: { id: user.id, username: user.username },
        });
        break;
      case 'users':
        navigate('/app/users');
        break;

      default:
        break;
    }
  };

  const onUserMenuClick = (id) => {
    switch (id) {
      case 'addPost':
        modalContext.handleOpen('CREATE_POST');
        break;
      case 'logout':
        userContext.onLogout();
        break;

      default:
        break;
    }
  };

  const onHome = () => {
    navigate('/app/posts');
  };

  return (
    <NavbarUI
      icon={process.env.FAVICON}
      avatar={user.avatar}
      username={user.username}
      menu={MENU.map((item) => ({ ...item, label: t(item.label) }))}
      onMenuClick={onMenuClick}
      userMenu={USER_MENU.map((item) => ({
        ...item,
        label: t(item.label),
      }))}
      onUserMenuClick={onUserMenuClick}
      onHome={onHome}
    />
  );
};
