import React from "react";
import PropTypes from "prop-types";

DescriptionProduct.propTypes = {
  product: PropTypes.object,
};

function DescriptionProduct({ product = {} }) {
  return <div dangerouslySetInnerHTML={{ __html: product.description }}></div>;
}

export default DescriptionProduct;
