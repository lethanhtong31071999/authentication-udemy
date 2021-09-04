import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { Controller } from "react-hook-form";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

QuantityField.defaultProps = {
  label: "",
  disabled: false,
};

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    display: "flex",
    flexWrap: "nowrap",
    margin: theme.spacing(2, 0),
  },
}));

function QuantityField(props) {
  const classes = useStyles();
  const { form, name, label, disabled } = props;
  const [hasError, setHasError] = useState(false);
  const [errorMess, setErrorMess] = useState("");

  return (
    <Controller
      control={form.control}
      name={name}
      render={(props) => {
        // field = name, value, onChange, onBlur, ref
        const field = props.field;
        const fieldState = props.fieldState;
        const { invalid, error, isTouched } = fieldState;
        if (invalid && isTouched) setHasError(true);
        else setHasError(false);
        if (error !== undefined) setErrorMess(error?.message);
        else setErrorMess("");
        return (
          <Box>
            <FormControl error={hasError} margin="normal" variant="outlined">
              <Typography>{label}</Typography>
              <Box className={classes.action}>
                <IconButton
                  onClick={() => {
                    form.setValue(
                      name,
                      Number.parseInt(field.value)
                        ? Number.parseInt(field.value) - 1
                        : 1
                    );
                  }}
                >
                  <RemoveCircleOutline />
                </IconButton>
                <OutlinedInput {...field} type="number" />
                <IconButton
                  onClick={() => {
                    form.setValue(
                      name,
                      Number.parseInt(field.value)
                        ? Number.parseInt(field.value) + 1
                        : 1
                    );
                  }}
                >
                  <AddCircleOutline />
                </IconButton>
              </Box>
              <FormHelperText>{errorMess}</FormHelperText>
            </FormControl>
          </Box>
        );
      }}
    />
  );
}

export default QuantityField;
