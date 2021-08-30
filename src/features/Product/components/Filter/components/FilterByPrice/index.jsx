import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object.isRequired,
};

FilterByPrice.defaultProps = {
  onChange: null,
};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  range: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  span: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  btnGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  btn: {
    minWidth: "40%",
    // flex: 1,
  },
}));

function FilterByPrice(props) {
  const { onChange, filters } = props;

  const initialState = {
    salePrice_gte: 0,
    salePrice_lte: 0,
  };
  const classes = useStyle();
  const [rangePrice, setRangePrice] = useState(initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setRangePrice((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const isInValidRange = () => {
    let count = 0;
    for (const key in rangePrice) {
      if (rangePrice[key] === 0) count++;
    }
    return count === 2 ? true : false;
  };

  const handleOnSubmit = () => {
    if (!onChange) return;
    const cloneFilters = { ...filters, ...rangePrice };

    if (isInValidRange()) {
      delete cloneFilters["salePrice_gte"];
      delete cloneFilters["salePrice_lte"];
    }

    onChange(cloneFilters);
  };
  const handleResetField = () => {
    setRangePrice(initialState);
  };

  return (
    <Box className={classes.root}>
      <Typography>CHỌN KHOẢNG GIÁ</Typography>

      <Box className={classes.range}>
        <Typography className={classes.span}>Từ: </Typography>
        <TextField
          name="salePrice_gte"
          value={rangePrice["salePrice_gte"]}
          onChange={handleOnChange}
          type="number"
          variant="outlined"
          size="small"
        />
        <Typography className={classes.span}>Đến: </Typography>
        <TextField
          name="salePrice_lte"
          value={rangePrice["salePrice_lte"]}
          onChange={handleOnChange}
          type="number"
          variant="outlined"
          size="small"
        />
      </Box>

      <Box className={classes.btnGroup}>
        <Button
          className={classes.btn}
          variant="outlined"
          color="primary"
          onClick={handleOnSubmit}
        >
          ÁP dụng
        </Button>
        <Button
          className={classes.btn}
          variant="outlined"
          color="secondary"
          onClick={handleResetField}
        >
          Xóa
        </Button>
      </Box>
    </Box>
  );
}

export default FilterByPrice;
