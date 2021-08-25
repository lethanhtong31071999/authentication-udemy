import React from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import { useEffect } from "react";
import productApi from "api/productApi";
import { useState } from "react";
import ProductSkeleton from "features/Product/components/ProductSkeleton";
import ProductList from "features/Product/components/ProductList";
import { Pagination } from "@material-ui/lab";
import ProductSort from "features/Product/components/ProductSort";
import Filter from "features/Product/components/Filter";
import FillterSkeleton from "features/Product/components/FillterSkeleton";

ListPage.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {},

  left: {
    width: "250px",
  },

  right: {
    flex: "1",
  },
  wrapper: {
    paddingBottom: theme.spacing(4),
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "nowrap",
    marginTop: "20px",
  },
}));

function ListPage(props) {
  const classes = useStyle();
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 10,
  });

  // Filter phai giong param tren url de gui Request
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 10,
    _sort: "salePrice:ASC",
  });

  useEffect(() => {
    // Did mount
    try {
      const getProduct = async () => {
        const response = await productApi.getAll(filters);
        const { data, pagination } = response;
        setProductList(data);
        setPagination(pagination);
        setLoading(false);
      };

      getProduct();
    } catch (e) {
      console.log(e);
    }
    return () => {
      // Will unmount
    };
  }, [filters]);

  const handlePagination = (e, page) => {
    setFilters((state) => ({
      ...state,
      _page: page,
    }));
  };

  const handleSortChange = (value) => {
    setFilters((state) => ({
      ...state,
      _sort: value,
    }));
  };

  const handleChangeFilter = (valuesFilters) => {
    const cloneFilters = {
      ...filters,
      ...valuesFilters,
    };

    // Truong hop gia start end = 0 sau khi submit
    if (Object.entries(valuesFilters).length < 1) {
      console.log("checked");
      delete cloneFilters.salePrice_gte;
      delete cloneFilters.salePrice_lte;
    }

    setFilters(cloneFilters);
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              {loading ? (
                <FillterSkeleton />
              ) : (
                <Filter onChange={handleChangeFilter} />
              )}
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0} className={classes.wrapper}>
              <ProductSort
                valueSort={filters._sort}
                onSortChange={(value) => handleSortChange(value)}
              />
              {loading ? (
                <ProductSkeleton />
              ) : (
                <ProductList data={productList} />
              )}

              <Box className={classes.pagination}>
                <Pagination
                  onChange={handlePagination}
                  page={pagination.page}
                  count={Math.ceil(pagination.total / pagination.limit)}
                  color="primary"
                  size="large"
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
