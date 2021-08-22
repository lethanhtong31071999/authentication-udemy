import { register } from "features/Auth/userSlice";
import React from "react";
import RegisterForm from "../RegisterForm";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

Register.propTypes = {};

function Register(props) {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    console.log("Form submit: ", values);
    try {
      // auto set username
      values["username"] = values.email;

      const action = register(values);
      const resultAction = await dispatch(action);

      // unwrapResult dung de catch loi tu cai function dispatch
      const user = unwrapResult(resultAction);
      console.log("new user: ", user);
    } catch (e) {
      console.log("error register: ", e);
    }
  };

  return <RegisterForm onSubmit={handleSubmit} />;
}

export default Register;
