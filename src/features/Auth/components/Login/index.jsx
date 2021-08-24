import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../LoginForm";
import { useDispatch } from "react-redux";
import { loginAction } from "features/Auth/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";

Login.propTypes = {
  onCloseDialog: PropTypes.func,
};

Login.defaultProps = {
  onCloseDialog: null,
};

function Login(props) {
  const { onCloseDialog } = props;

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleOnSubmit = async (values) => {
    try {
      const action = loginAction(values);
      const resultAction = await dispatch(action);

      // Unwrap check de tiep tuc thuc hien hoac xg catch
      const user = unwrapResult(resultAction);
      if (onCloseDialog) {
        onCloseDialog();
      }
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  return <LoginForm onSubmit={handleOnSubmit} />;
}

export default Login;
