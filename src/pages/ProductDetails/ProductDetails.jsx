import React, { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import useAxios from "../../Components/Hooks/useAxios";
import DetailsDesign from "../../Components/CardDesign/Product-Details-Design/DetailsDesign";
import { useParams } from "react-router";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState(null);
  const axios = useAxios();

  const { id } = useParams();
  console.log("toy id", id);

  useEffect(() => {
    axios
      .get(`/toys/${id}`)
      .then((res) => {
        console.log("DATA FROM BACKEND:", res.data);
        setProductDetails(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [axios, id]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  if (!productDetails) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <section className="details_section">
        <DetailsDesign
          key={productDetails._id}
          pictureURL={productDetails.pictureURL}
          sellerName={productDetails.sellerName}
          sellerEmail={productDetails.sellerEmail}
          description={productDetails.description}
          toyName={productDetails.toyName}
          subCategory={productDetails.subCategory}
          rating={productDetails.rating}
          price={productDetails.price}
          availableQuantity={productDetails.availableQuantity}
        />
      </section>
    </div>
  );
};

export default ProductDetails;
