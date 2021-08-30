import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import productApi from "api/productApi";
import FillterSkeleton from "features/Product/components/FillterSkeleton";
import Filter from "features/Product/components/Filter";
import FilterViewer from "features/Product/components/FilterViewer";
import ProductList from "features/Product/components/ProductList";
import ProductSkeleton from "features/Product/components/ProductSkeleton";
import ProductSort from "features/Product/components/ProductSort";
import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";

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

  const history = useHistory();
  const location = useLocation();
  // Convert params url to object
  const queryParams = queryString.parse(history.location.search);
  // Filter phai giong param tren url de gui Request
  const [filters, setFilters] = useState({
    ...queryParams,
    _page: Number.parseInt(queryParams._page) || 1,
    _limit: Number.parseInt(queryParams._limit) || 12,
    _sort: queryParams._sort || "salePrice:ASC",
  });

  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 1,
    total: 10,
  });

  // when url was set then filters state sync with url (set default url)
  useEffect(() => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  }, [filters]);

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
    // Da xu ly valuesFilters la object moi o component con
    setFilters(valuesFilters);
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
                <Filter filters={filters} onChange={handleChangeFilter} />
              )}
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0} className={classes.wrapper}>
              <ProductSort
                valueSort={filters._sort}
                onSortChange={(value) => handleSortChange(value)}
              />
              <FilterViewer filters={filters} onChange={handleChangeFilter} />
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
