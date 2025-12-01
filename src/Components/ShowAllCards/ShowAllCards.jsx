import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import AllCardDesign from "../CardDesign/AllCardsDesign/AllCardDesign";
import Loading from "../Loading/Loading";
import useAxios from "../Hooks/useAxios";

const ShowAllCards = () => {
  const [toysData, setToysData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  useEffect(() => {
    axios
      .get("/toys-all")
      .then((res) => {
        setToysData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [axios]);

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="my-10 px-4 sm:px-8 md:px-12 lg:px-23">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 justify-items-center gap-6 sm:gap-8 lg:gap-3 mt-10">
        {toysData.map((item) => (
          <Link key={item._id} to={`/product/productDetails/${item._id}`}>
            <AllCardDesign
              pictureURL={item.pictureURL}
              toyName={item.toyName}
              price={item.price}
              availableQuantity={item.availableQuantity}
              description={item.description}
              rating={item.rating}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShowAllCards;
