import { useState } from 'react';

import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import AuthForm from '@/components/AuthForm';
import AuthLayout from '@/layouts/AuthLayout';

import SignUpForm from '@/templates/SignUp/SignUpForm';
import VerifyEmailPage from '@/templates/SignUp/VerifyEmailPage';

import { AUTH_STEPS } from '@/constants/auth';
import ROUTES from '@/constants/routes';

import sharedStyles from '@/styles/shared/sharedStyles';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SuccessNotification,
  ErrorNotification,
} from '@/components/Notification/Notifications';

const TITLE_CONFIG = {
  main: 'sign up 🌟',
  subtitle: 'Already have an account?',
  linklabel: 'Sign in',
  route: ROUTES.SIGNIN,
};

/**
 * Renders a sign-up form with email and password inputs,
 * and submits the data to Firebase authentication.
 *
 * @return {JSX.Element} Returns a JSX element of the AuthForm component.
 */
const SignUp = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [authStep, setAuthStep] = useState(AUTH_STEPS.EMAIL);
  const [email, setEmail] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSwitchScreen = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleGoBack = () => {
    setAuthStep(AUTH_STEPS.EMAIL);
  };

  const renderGoBack = () => {
    if (authStep === AUTH_STEPS.PASSWORD) {
      return (
        <IconButton
          size="large"
          {...sharedStyles.backButtonProps}
          onClick={handleGoBack}
        >
          <ArrowBack />
        </IconButton>
      );
    }

    return null;
  };

  const renderForm = () => {
    return (
      <AuthForm
        form={
          <SignUpForm
            step={authStep}
            setStep={setAuthStep}
            setEmail={setEmail}
            handleSwitch={handleSwitchScreen}
          />
        }
        goBack={renderGoBack()}
        title={TITLE_CONFIG}
      />
    );
  };

  const renderVerifyEmail = () => {
    return <VerifyEmailPage email={email} />;
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          backgroundColor: '#3D252B',
          color: 'white',
          textAlign: 'center',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          border: '1px solid #FE6167',
          zIndex: 9999,
        }}
      />
      {isSignUp && renderForm()}
      {!isSignUp && renderVerifyEmail()}
    </>
  );
};

SignUp.getLayout = function getLayout(page) {
  return <AuthLayout isAuthScreen>{page}</AuthLayout>;
};

export default SignUp;
