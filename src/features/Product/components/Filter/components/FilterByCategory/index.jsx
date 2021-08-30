import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { useEffect } from "react";
import categoryApi from "api/categoryApi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "features/Product/categorySlice";
import { useRef } from "react";

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object.isRequired,
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
  const { onChange, filters } = props;
  const [categoryList, setCategoryList] = useState([]);
  const categoryRef = useRef([]);
  const classes = useStyle();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const getCategories = async () => {
        const data = await categoryApi.getAll();
        const mapCategoryList = data.map((x) => ({ id: x.id, name: x.name }));
        // Set redux
        dispatch(addCategory(mapCategoryList));

        mapCategoryList.unshift({ id: "all", name: "All" });
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

    // Set multiple selected categories
    let selectedId = categoryRef.current;
    selectedId.push(categoryId);
    // filters duplicate values
    selectedId = selectedId.filter(
      (item, index, originArr) => originArr.indexOf(item) === index
    );

    // Callback function in parent component.
    const cloneFilters = { ...filters, "category.id_in": selectedId };
    if (categoryId === "all") {
      categoryRef.current = [];
      delete cloneFilters["category.id_in"];
    }
    onChange(cloneFilters);
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
