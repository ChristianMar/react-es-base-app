import React, { useState, useEffect } from 'react';
import { I18n } from 'react-polyglot';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { it } from '../i18n/it';
import { en } from '../i18n/en';
import { AppLayout as AppLayoutUI } from '../../../ui/src/common/layouts/AppLayout';
import { UserContextProvider } from '../context/UserContext';
import LanguageContext from '../context/LanguageContext';
import { ErrorHandler } from './ErrorHandler';
import { Login } from '../components/auth/Login';
import { LoggedLayout } from './LoggedLayout';
import { NoMatch } from './NoMatch';
import { selectCurrentUser } from '../store/slices/userSlice';

const languages = {
  it: it,
  en: en,
};

export const AppLayout = () => {
  const user = useSelector(selectCurrentUser);
  const [language, setLanguage] = useState('en');
  const [messages, setMessages] = useState(en);
  const [error, setError] = useState(false);

  const getLanguage = () => {
    if (!user.token) {
      if (!navigator) return;
      if (navigator.languages[0] !== 'it' && navigator.languages[0] !== 'en')
        return;
      const lang = navigator.languages[0];
      setLanguage(lang);
      setMessages(languages[lang]);
    } else {
      const lang =
        user.language !== 'en' && user.language !== 'it' ? 'en' : user.language;
      setLanguage(lang);
      setMessages(languages[lang]);
    }
  };

  useEffect(() => {
    getLanguage();
  }, []);

  useEffect(() => {
    if (user.token) getLanguage();
  }, [user.token]);

  return (
    <AppLayoutUI>
      <I18n locale={language} messages={messages}>
        <UserContextProvider>
          <LanguageContext.Provider
            value={{
              language: language,
            }}
          >
            <ErrorBoundary
              FallbackComponent={ErrorHandler}
              onReset={() => setError(false)}
              resetKeys={[error]}
            >
              <Routes>
                <Route path="/">
                  <Route path="/" element={<Login />} />
                  <Route path="app/*" element={<LoggedLayout />} />
                  <Route path="*" element={<NoMatch />} />
                </Route>
              </Routes>
            </ErrorBoundary>
          </LanguageContext.Provider>
        </UserContextProvider>
      </I18n>
    </AppLayoutUI>
  );
};
