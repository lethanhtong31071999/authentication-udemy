import { unwrapResult } from "@reduxjs/toolkit";
import { registerAction } from "features/Auth/userSlice";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import RegisterForm from "../RegisterForm";

Register.propTypes = {
  onCloseDialog: PropTypes.func,
};

Register.defaultProps = {
  onCloseDialog: null,
};

function Register({ onCloseDialog }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      // auto set username
      values["username"] = values.email;

      const action = registerAction(values);
      const resultAction = await dispatch(action);

      // unwrapResult dung de catch loi tu cai function dispatch
      const user = unwrapResult(resultAction);
      enqueueSnackbar("Register successfully", { variant: "success" });
      if (onCloseDialog) {
        onCloseDialog();
      }
    } catch (e) {
      // Received by Throw Error in axiosClient
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  return <RegisterForm onSubmit={handleSubmit} />;
}

export default Register;
