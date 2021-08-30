import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";

FilterByService.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object.isRequired,
};

FilterByService.defaultProps = {
  onChange: null,
};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
}));

function FilterByService(props) {
  const { onChange, filters } = props;
  const classes = useStyle();
  const renderCheckboxArr = [
    {
      value: "isPromotion",
      label: "Có khuyến mãi",
    },
    {
      value: "isFreeShip",
      label: "Miễn phí giao hàng",
    },
  ];

  const handleOnChange = (e) => {
    const { name, checked } = e.target;

    const cloneFilters = { ...filters };
    if (cloneFilters[name]) {
      delete cloneFilters[name];
    } else {
      cloneFilters[name] = checked;
    }
    onChange(cloneFilters);
  };

  return (
    <Box className={classes.root}>
      <Typography variant="body2">DỊCH VỤ</Typography>

      <ul className={classes.list}>
        {renderCheckboxArr.map((service) => (
          <FormControlLabel
            key={service.value}
            control={
              <Checkbox
                checked={Boolean(filters[service.value])}
                onChange={handleOnChange}
                name={service.value}
                color="primary"
              />
            }
            label={service.label}
          />
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;
