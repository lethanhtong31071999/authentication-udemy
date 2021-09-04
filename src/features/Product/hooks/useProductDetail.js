import productApi from "api/productApi";
import { useEffect, useState } from "react";

const useProductDetail = (productId) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await productApi.get(productId);
        setProduct(data);
      } catch (error) {
        console.log("failed to fetch product detail: ", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [productId]);

  return {
    product,
    loading,
  };
};

export default useProductDetail;
