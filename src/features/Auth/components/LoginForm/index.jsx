import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import InputField from "custom-fields/InputField";
import PasswordField from "custom-fields/PasswordField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  onSubmit: null,
};

const useStyle = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    position: "relative",
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
  progress: {
    position: "absolute",
    top: 0,
    width: "100%",
  },
}));

function LoginForm({ onSubmit }) {
  const classes = useStyle();

  const schema = Yup.object().shape({
    identifier: Yup.string()
      .required("Enter your email!")
      .email("Invalid email!"),
    password: Yup.string().required("Enter your password"),
  });

  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleFormSubmit = async (values) => {
    if (!onSubmit) return;
    await onSubmit(values);
  };

  return (
    <div className={classes.root}>
      {isSubmitting ? <LinearProgress className={classes.progress} /> : null}
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>

      <Typography className={classes.title} component="h3" variant="h5">
        Login
      </Typography>

      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <InputField form={form} label="Email" name="identifier" />
        <PasswordField form={form} label="Password" name="password" />
        <Button
          className={classes.submit}
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          disabled={isSubmitting}
          margin="normal"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
