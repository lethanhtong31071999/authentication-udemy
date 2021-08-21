import React from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../../../custom-fields/InputField";
import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import PasswordField from "../../../../custom-fields/PasswordField";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

RegisterForm.defaultProps = {
  onSubmit: null,
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
  },
  avatar: {
    margin: "0 auto",
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    textAlign: "center",
    margin: theme.spacing(2, 0, 4, 0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },
}));

function RegisterForm(props) {
  const classes = useStyles();
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required("Pls enter this field")
      .min(5, "at least 5 letters"),
    email: yup
      .string()
      .required("Pls enter this field")
      .min(5, "at least 5 letters"),
    password: yup
      .string()
      .required("Pls enter this field")
      .min(6, "at least 6 letters"),
    confirmPassword: yup
      .string()
      .required("Pls enter this field")
      .min(6, "at least 6 letters"),
  });

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    // resolver: yupResolver(schema),
  });

  const onHandleSubmit = (values) => {
    const { onSubmit } = props;
    console.log("Submit: ", typeof onSubmit);
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
  };

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>

      <Typography className={classes.title} component="h3" variant="h5">
        Create an Account
      </Typography>

      <form onSubmit={form.handleSubmit(onHandleSubmit)}>
        <InputField form={form} label="Full Name" name="fullName" />
        <InputField form={form} label="Email" name="email" />
        <PasswordField form={form} label="Password" name="password" />
        <InputField
          form={form}
          label="Confirm Password"
          name="confirmPassword"
        />
        <Button
          className={classes.submit}
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
        >
          Create an Account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
