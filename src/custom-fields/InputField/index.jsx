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
      render={(field) => {
        const { onChange, onBlur, value, name } = field;
        const { invalid, error } = field["fieldState"];
        return (
          <TextField
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
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
