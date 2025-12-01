import { BsFillStarFill } from "react-icons/bs";

const DetailsDesign = ({
  pictureURL,
  sellerName,
  sellerEmail,
  description,
  toyName,
  subCategory,
  rating,
  price,
  availableQuantity,
}) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-15 py-8">
      <section className="">
        <div className="image-sec flex justify-center items-center">
          <img src={pictureURL} alt={toyName} className="w-[300px]" />
        </div>

        <div className="seller-info pt-20">
          <p className="text-[0.9rem] font-semibold">
            Seller name: {sellerName}
          </p>
          <p className="text-[0.9rem]">Seller email: {sellerEmail}</p>
        </div>

        <div className="describe-sec">
          <p className="text-[0.9rem] font-bold pt-4">Products Details</p>
          <p className="pt-2 text-gray-500 text-[0.8rem]">{description}</p>
        </div>
      </section>

      <section className="pt-20 ">
        <div className="space-y-2">
          <h3 className="text-2xl">{toyName}</h3>
          <p>Subcategory: {subCategory}</p>
          <p className="flex gap-2 items-center">
            Ratings: <BsFillStarFill className="text-yellow-400" /> {rating}
          </p>
          <p>
            Price: {price} <span className="text-green-500">$</span>
          </p>
          <p>Available Product: {availableQuantity} peace</p>
          <button className="btn bg-[#0F83B2] text-white text-[0.9rem] px-8">
            Add to cart
          </button>
        </div>
      </section>
    </div>
  );
};

export default DetailsDesign;
