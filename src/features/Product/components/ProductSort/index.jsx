import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs } from "@material-ui/core";

ProductSort.propTypes = {
  valueSort: PropTypes.string.isRequired,
  onSortChange: PropTypes.func,
};

ProductSort.defaultProps = {
  onSortChange: null,
};

function ProductSort({ valueSort, onSortChange }) {
  const handleChange = (e, value) => {
    if (onSortChange) {
      onSortChange(value);
    }
  };

  return (
    <Tabs
      value={valueSort}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleChange}
    >
      <Tab label="Giá tăng dần" value="salePrice:ASC" />
      <Tab label="Giá giảm dần" value="salePrice:DESC" />
    </Tabs>
  );
}

export default ProductSort;
