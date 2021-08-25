import { Box } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import FilterByCategory from "./components/FilterByCategory";
import FilterByPrice from "./components/FilterByPrice";

Filter.propTypes = {
  onChange: PropTypes.func,
};

Filter.defaultProps = {
  onChange: null,
};

function Filter(props) {
  const { onChange } = props;

  const handleCategoryChange = (categoryId) => {
    if (!onChange) return;
    onChange({ "category.id": categoryId });
  };

  const handlePriceChange = (objectPrice) => {
    console.log("delte: ", objectPrice);
    if (!onChange) return;
    let count = 0;
    for (const key in objectPrice) {
      if (objectPrice[key] === 0) count++;
    }

    count === 2 ? onChange({}) : onChange(objectPrice);
  };

  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handlePriceChange} />
    </Box>
  );
}

export default Filter;
