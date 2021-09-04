import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, makeStyles } from "@material-ui/core";
import InputField from "custom-fields/InputField";
import QuantityField from "custom-fields/QuantityField";

AddCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "25%",
  },
}));

function AddCartForm({ onSubmit = null }) {
  const classes = useStyles();
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required("Please enter quantity")
      .min(1, "Minium value is 1")
      .typeError("Please enter a number"),
  });

  const form = useForm({
    defaultValues: {
      quantity: "1",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = (values) => {
    if (!onSubmit) return;
    onSubmit(values);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmitForm)}
      className={classes.root}
    >
      <QuantityField form={form} name="quantity" label="Quantity" />
      <Button
        type="submit"
        size="large"
        variant="contained"
        fullWidth
        color="primary"
      >
        Add to cart
      </Button>
    </form>
  );
}

export default AddCartForm;
