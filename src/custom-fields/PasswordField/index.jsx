import { FormHelperText } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

PasswordField.defaultProps = {
  label: "",
  disabled: false,
};

function PasswordField(props) {
  const { form, name, label, disabled } = props;
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((state) => !state);
  };

  const [hasError, setHasError] = useState(false);
  const [errorMess, setErrorMess] = useState("");
  return (
    <div>
      <FormControl
        error={hasError}
        variant="outlined"
        fullWidth
        margin="normal"
      >
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Controller
          name={name}
          control={form.control}
          render={(props) => {
            // const { onChange, onBlur, value, name } = props.field;
            const { invalid, error, isTouched } = props.fieldState;
            if (invalid && isTouched) setHasError(true);
            else setHasError(false);

            if (error) setErrorMess(error.message);
            else setErrorMess("");
            console.log(props);
            return (
              <OutlinedInput
                {...props.field}
                // helperText={error?.message}
                id={name}
                type={showPassword ? "text" : "password"}
                label={label}
                disabled={disabled}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            );
          }}
        />
        <FormHelperText>{errorMess}</FormHelperText>
      </FormControl>
    </div>
  );
}

export default PasswordField;
