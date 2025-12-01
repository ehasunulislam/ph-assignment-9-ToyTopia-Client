import React from "react";
import { IoIosStar } from "react-icons/io";

const AllCardDesign = ({
  toyName,
  pictureURL,
  price,
  rating,
  availableQuantity,
  description,
}) => {
  const shortDescription = description
    ? description.split(" ").slice(0, 9).join(" ") + "....."
    : "";
  return (
    <div>
      <div className="card shadow-sm h-[350px] bg-gray-100">
        <figure className="py-5">
          <img src={pictureURL} alt={toyName} className="w-20" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-[0.9rem]">{toyName}</h2>

          <div className="flex justify-between items-center">
            <p>
              Price: <span className="text-green-600">{price} $</span>
            </p>
            <p className="text-[0.83rem]">available: <span className="text-yellow-600">{availableQuantity}</span> peace</p>
          </div>

          <div className="pt-3">
            <p>{shortDescription}</p>
          </div>

          <div className="flex flex-col items-end justify-end">
            <p>
              <IoIosStar style={{ color: "gold" }} />
            </p>
            <p className="text-end">{rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCardDesign;
