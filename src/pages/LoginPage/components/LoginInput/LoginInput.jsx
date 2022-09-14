import React, { useEffect, useState } from 'react';
import { LoginFormControl } from '../../styled';
import { TextField } from '@mui/material';
import useDebounce from '../../../../hooks/useDebounce';
import { InputError } from '../../../../components/Input/styled';

const LoginInput = ({ type, label, field, formik }) => {
  const [newValue, setNewValue] = useState('');

  const debouncedNewValue = useDebounce(newValue, 10);

  useEffect(() => {
    handleChange(field, debouncedNewValue);
    //	eslint-disable-next-line
  }, [debouncedNewValue]);

  const handleChange = (field) => {
    formik.setFieldValue(field, newValue);
  };

  return (
    <LoginFormControl>
      <TextField
        type={type}
        label={label}
        variant="outlined"
        onChange={(e) => setNewValue(e.target.value)}
        onFocus={() => formik.setFieldTouched(field)}
      />
      {formik.errors[field] && formik.touched[field] ? (
        <InputError>{formik.errors[field]}</InputError>
      ) : (
        ''
      )}
    </LoginFormControl>
  );
};

export default LoginInput;
