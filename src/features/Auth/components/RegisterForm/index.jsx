import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import InputField from "../../../../custom-fields/InputField";
import {
  Avatar,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import PasswordField from "../../../../custom-fields/PasswordField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

RegisterForm.defaultProps = {
  onSubmit: null,
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    position: "relative",
    transition: "all 0.3s linear",
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

function RegisterForm(props) {
  const classes = useStyles();

  const schema = Yup.object().shape({
    fullName: Yup.string()
      .trim()
      .required("Pls enter your full name")
      .test("nameRule-TwoWord", "Pls enter at least 2 words!", (value) => {
        return value.split(" ").length > 1;
      }),

    email: Yup.string()
      .trim()
      .required("Pls enter your email")
      .email("Invalid email!"),

    password: Yup.string()
      .trim()
      .required("Pls enter this field")
      .min(6, "at least 6 letters"),
    confirmPassword: Yup.string()
      .trim()
      .required("Pls enter this field")
      .oneOf([Yup.ref("password")], "Password does not match"),
  });

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const isSubmitting = form.formState.isSubmitting;

  const onHandleSubmit = async (values) => {
    const { onSubmit } = props;
    console.log("Submit: ", typeof onSubmit);
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <div className={classes.root}>
      {isSubmitting ? <LinearProgress className={classes.progress} /> : null}
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
        <PasswordField
          form={form}
          label="Confirm Password"
          name="confirmPassword"
        />
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
          Create an Account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
