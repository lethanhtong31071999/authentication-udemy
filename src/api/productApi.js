import axiosClient from "./axiosClient";

const productApi = {
  async getAll(params) {
    // params: {_page, _limit} so page muon hien thi
    // Xu ly truong hop get Product with mutiple category
    // Case with 2 gategory
    const isMutipleCategory =
      Boolean(params["category.id_in"]) &&
      Array.isArray(params["category.id_in"]);
    const categoryParams = isMutipleCategory
      ? params["category.id_in"].map((x) => `category.id_in=${x}`).join("&")
      : null;

    // Url
    const productUrl = isMutipleCategory
      ? `/products?${categoryParams}`
      : "/products";
    const countProductUrl = isMutipleCategory
      ? `/products/count?${categoryParams}`
      : "/products/count";

    // convert _page to _start
    // create a newParams
    const newParams = { ...params };

    if (params._page && Number.isInteger(params._page) && params._page > 1) {
      newParams._start = (newParams._page - 1) * (params._limit || 20);
    } else newParams._start = 0;

    // Delete unneeds
    delete newParams._page;

    // Call API
    // Response da dc xu ly o file axiosClient
    const dataProducts = await axiosClient.get(productUrl, {
      params: newParams,
    });
    const dataCount = await axiosClient.get(countProductUrl, {
      params: newParams,
    });
    // console.log("products: ", dataProducts);
    // console.log("count: ", dataCount);

    // Create response
    const response = {
      data: dataProducts,
      pagination: {
        page: params._page,
        limit: newParams._limit,
        total: dataCount,
      },
    };
    return response;
  },

  get: async (id) => {
    const url = `products/${id}`;
    return axiosClient.get(url);
  },
};

export default productApi;
