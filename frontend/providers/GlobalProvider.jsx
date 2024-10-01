import { createContext, useEffect, useMemo, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { Provider, useDispatch, useSelector } from 'react-redux';

import useRedirect from '@/hooks/useRedirect';

import SnackBar from '@/components/SnackBar';
import {
  setLoading,
  setUser,
  setShowSignupSuccessNotification,
} from '@/redux/slices/authSlice';
import { setUserData } from '@/redux/slices/userSlice';
import store, { auth, firestore, functions } from '@/redux/store';

const AuthContext = createContext();

/**
 * Creates an authentication provider to observe authentication state changes.
 *
 * @param {Object} children - The child components to render.
 * @return {Object} The child components wrapped in the authentication provider.
 */
const AuthProvider = (props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const { showSignupSuccessNotification } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [message, setMessage] = useState('Default Message');

  const handleOpenSnackBar = (newSeverity, newMessage) => {
    setSeverity(newSeverity);
    setMessage(newMessage);
    setOpen(true);
  };

  const memoizedValue = useMemo(() => {
    return {
      handleOpenSnackBar,
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return null;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get auth user claims
        const { claims } = await user.getIdTokenResult(true);
        dispatch(setUser({ ...user.toJSON(), claims }));

        const creationTime = user.metadata.creationTime;
        const lastSignInTime = user.metadata.lastSignInTime;
        const userId = user.uid;
        const signupNotificationShownKey = `signupNotificationShown_${userId}`;
        const signupNotificationShown = localStorage.getItem(
          signupNotificationShownKey
        );

        if (
          creationTime === lastSignInTime &&
          !signupNotificationShown &&
          user.emailVerified
        ) {
          dispatch(setShowSignupSuccessNotification(true));
          localStorage.setItem(signupNotificationShownKey, 'true');
        }

        dispatch(setLoading(false));
        return;
      }

      dispatch(setLoading(false));
      dispatch(setUser(false));
      return dispatch(setUserData(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  useRedirect(firestore, functions, handleOpenSnackBar);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
      <SnackBar
        open={open}
        severity={severity}
        message={message}
        handleClose={handleClose}
      />
    </AuthContext.Provider>
  );
};

/**
 * Creates a global provider component that wraps the entire app and provides access to the Redux store and authentication.
 *
 * @param {Object} props - The properties to be passed to the component.
 * @param {ReactNode} props.children - The child elements to be rendered within the provider.
 * @return {JSX.Element} The provider component.
 */
const GlobalProvider = (props) => {
  const { children } = props;
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};

export { AuthContext };

export default GlobalProvider;
