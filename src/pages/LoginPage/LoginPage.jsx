import React, { useEffect, useState } from 'react';
import { Button, FormGroup } from '@mui/material';
import { LoginForm, LoginPageWrapper } from './styled';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import WalletService from '../../services/wallet.service';
import { LoginInput } from './components/LoginInput';
import { MESSAGES } from '../../helpers/messages';
import LoginService from '../../services/login.service';
import LoadingButton from '@mui/lab/LoadingButton';
import { InfoMessage } from '../../components/Containers/InfoMessage';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const inputs = [
    {
      type: 'text',
      label: 'Login',
      field: 'login',
    },
    {
      type: 'password',
      label: 'Password',
      field: 'password',
    },
    {
      type: 'text',
      label: 'Address',
      field: 'address',
    },
  ];

  useEffect(() => {
    const loginState$ = LoginService.state$.subscribe((state) => {
      setLoading(state.loading);
      setError(state.error);
      if (state.accessToken) {
        navigate('/');
      }
    });

    return () => {
      loginState$.unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  const validationSchema = Yup.object().shape({
    login: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      address: '',
    },
    validationSchema: validationSchema,
    validateOnMount: true,
    onSubmit: async () => {
      setError(null);
      setLoading(true);
      const login = formik.values.login;
      const password = formik.values.password;
      const address = formik.values.address.toLowerCase();
      if (!WalletService.state.connected) {
        await WalletService.connect();
      }
      if (WalletService.state.address !== address) {
        formik.setFieldError('address', MESSAGES.NOT_MATCHING_ADDRESS);
        setLoading(false);
        return;
      }
      LoginService.login(login, password, address);
    },
  });

  return (
    <LoginPageWrapper>
      <LoginForm onSubmit={formik.handleSubmit}>
        <FormGroup>
          {inputs.map((input) => (
            <LoginInput
              type={input.type}
              label={input.label}
              field={input.field}
              formik={formik}
            />
          ))}
          {loading ? (
            <LoadingButton loading variant="outlined">
              Login
            </LoadingButton>
          ) : (
            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          )}
        </FormGroup>
        {error ? <InfoMessage message={error} /> : ''}
      </LoginForm>
    </LoginPageWrapper>
  );
};

export default LoginPage;
