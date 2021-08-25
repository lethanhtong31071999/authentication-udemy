import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { useEffect } from "react";
import categoryApi from "api/categoryApi";
import { useState } from "react";

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

FilterByCategory.defaultProps = {
  onChange: null,
};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },

  menu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    "& .item": {
      marginTop: theme.spacing(1),
      cursor: "pointer",

      "&:hover": {
        color: theme.palette.primary.dark,
      },
    },
  },
}));

function FilterByCategory(props) {
  const { onChange } = props;
  const [categoryList, setCategoryList] = useState([]);
  const classes = useStyle();
  useEffect(() => {
    try {
      const getCategories = async () => {
        const data = await categoryApi.getAll();
        const mapCategoryList = data.map((x) => ({ id: x.id, name: x.name }));
        setCategoryList(mapCategoryList);
      };
      getCategories();
    } catch (error) {
      console.log(error);
    }

    return () => {};
  }, []);

  const handleOnChange = (categoryId) => {
    if (!onChange) return;
    onChange(categoryId);
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1">DANH MỤC SẢN PHẨM</Typography>
      <ul className={classes.menu}>
        {categoryList.map((x) => (
          <li key={x.id} className="item" onClick={() => handleOnChange(x.id)}>
            <Typography variant="subtitle2">{x.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
