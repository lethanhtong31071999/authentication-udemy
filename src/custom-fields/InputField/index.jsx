import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

InputField.defaultProps = {
  label: "",
  disabled: false,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  return (
    <Controller
      name={name}
      control={form.control}
      render={(props) => {
        // console.log("props input field: ", props);
        const { invalid, error } = props.fieldState;
        return (
          <TextField
            {...props.field}
            error={invalid}
            helperText={error?.message}
            margin="normal"
            variant="outlined"
            fullWidth
            label={label}
            disabled={disabled}
          />
        );
      }}
    />
  );
}

export default InputField;
