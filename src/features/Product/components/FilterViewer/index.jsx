import React from "react";
import PropTypes from "prop-types";
import { Box, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  AttachMoney,
  Category,
  LocalShipping,
  Loyalty,
} from "@material-ui/icons";
import { useSelector } from "react-redux";

FilterViewer.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object.isRequired,
};

FilterViewer.defaultProps = {
  onChange: null,
};

const useStyle = makeStyles((theme) => ({
  root: {
    listStyle: "none",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    padding: theme.spacing(1),
    margin: theme.spacing(1),

    "& > li": {
      padding: theme.spacing(1),
      //   backgroundColor: "red",
      "& > .chip": {
        padding: theme.spacing(2, 1),
      },
    },
  },
}));

function FilterViewer(props) {
  const { filters, onChange } = props;
  const classes = useStyle();
  const categoryList = useSelector((state) => state.category.categoryList);

  const getLabelCategory = () => {
    if (!filters["category.id_in"]) return "";
    const listCategoryId = filters["category.id_in"];
    const labelList = categoryList
      .filter((x) => listCategoryId.includes(x.id))
      .map((x) => x.name);
    const result = labelList.join(" - ");
    return result;
  };

  const getLabelRangePrice = () => {
    if (filters.salePrice_gte || filters.salePrice_lte) {
      return `${filters.salePrice_gte}đ - ${filters.salePrice_lte}đ`;
    }
    return "";
  };

  const FILTER_LIST = [
    {
      id: 1,
      label: "Miễn phí giao hàng",
      icon: <LocalShipping fontSize="medium" />,
      clickable: true,
      onClick: () => {
        if (!onChange) return;
        const cloneFilters = { ...filters };
        if (cloneFilters.isFreeShip) delete cloneFilters.isFreeShip;
        else cloneFilters.isFreeShip = true;
        onChange(cloneFilters);
      },
      onDelete: null,
      isActive: Boolean(filters.isFreeShip),
      isVisible: true,
    },
    {
      id: 2,
      label: "Có khuyến mãi",
      icon: <Loyalty fontSize="medium" />,
      clickable: false,
      onClick: null,
      onDelete: () => {
        if (!onChange) return;

        const cloneFilters = { ...filters };
        delete cloneFilters.isPromotion;
        onChange(cloneFilters);
      },
      isActive: true,
      isVisible: Boolean(filters.isPromotion),
    },
    {
      id: 3,
      label: getLabelRangePrice(),
      icon: <AttachMoney fontSize="medium" />,
      clickable: false,
      onClick: null,
      onDelete: () => {
        if (!onChange) return;

        const cloneFilters = { ...filters };
        delete cloneFilters.salePrice_gte;
        delete cloneFilters.salePrice_lte;
        onChange(cloneFilters);
      },
      isActive: true,
      isVisible: Boolean(filters.salePrice_gte || filters.salePrice_lte),
    },
    {
      id: 4,
      label: getLabelCategory() || "",
      icon: <Category fontSize="medium" />,
      clickable: false,
      onClick: null,
      onDelete: () => {
        if (!onChange) return;

        const cloneFilters = { ...filters };
        delete cloneFilters["category.id_in"];
        onChange(cloneFilters);
      },
      isActive: true,
      isVisible: Boolean(filters["category.id_in"]),
    },
  ];

  return (
    <Box component="ul" className={classes.root}>
      {FILTER_LIST.filter((filter) => filter.isVisible).map((filter) => (
        <li key={filter.id}>
          <Chip
            className="chip"
            icon={filter.icon}
            label={filter.label}
            onDelete={filter.onDelete}
            clickable={filter.clickable}
            onClick={filter.onClick}
            // default
            size="medium"
            variant="outlined"
            color={filter.isActive ? "primary" : "default"}
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
