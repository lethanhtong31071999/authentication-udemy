import { Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import FilterByCategory from "./components/FilterByCategory";
import FilterByPrice from "./components/FilterByPrice";
import FilterByService from "./components/FilterByService";

Filter.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object.isRequired,
};

Filter.defaultProps = {
  onChange: null,
};

function Filter(props) {
  const { onChange, filters } = props;

  const handleChange = (values) => {
    onChange(values);
  };

  return (
    <Box>
      <FilterByCategory filters={filters} onChange={handleChange} />
      <FilterByPrice filters={filters} onChange={handleChange} />
      <FilterByService filters={filters} onChange={handleChange} />
    </Box>
  );
}

export default Filter;
