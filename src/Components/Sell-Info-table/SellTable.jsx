import React, { useEffect, useState, useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import useAxios from "../Hooks/useAxios";
import Loading from "../Loading/Loading";
import useAuthInfo from "../Hooks/useAuthInfo";
import { IoStar } from "react-icons/io5";
import Lottie from "lottie-react";
import { assets } from "../../assets/assets";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const SellTable = () => {
  const [showData, setShowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedToy, setSelectedToy] = useState(null);

  const axios = useAxios();
  const { user } = useAuthInfo();
  const modalRef = useRef(null);

  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch user toys
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`/toys-by-email?email=${user.email}`)
      .then((res) => {
        setShowData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axios, user]);

  if (loading) return <Loading />;

  // Delete product
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You cannot undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/toys/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            setShowData(showData.filter((item) => item._id !== id));
            Swal.fire("Deleted!", "Your toy has been removed.", "success");
          }
        });
      }
    });
  };

  // Open modal with data
  const openModal = (toy) => {
    setSelectedToy(toy);
    reset(toy); // load toy data into react-hook-form
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
    setSelectedToy(null);
  };

  // Update toy
  const onSubmit = (data) => {
    delete data._id; // 👈 IMPORTANT

    axios.put(`/toys/${selectedToy._id}`, data).then((res) => {
      if (res.data.success) {
        setShowData((prev) =>
          prev.map((item) =>
            item._id === selectedToy._id ? { ...item, ...data } : item
          )
        );

        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Product updated successfully",
        });

        closeModal();
      } else {
        Swal.fire("No changes", "Nothing was updated", "info");
      }
    });
  };

  if (showData.length === 0) {
    return (
      <div className="text-center py-12 text-xl text-gray-500 font-semibold">
        You have nothing to sell
        <div className="w-40 mx-auto">
          <Lottie animationData={assets.sad} loop={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto px-2 sm:px-4">
      {/* TABLE WRAPPER */}
      <div className="min-w-[600px] sm:min-w-full">
        <table className="table w-full">
          <thead className="text-sm sm:text-base">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Name</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Created At</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {showData.map((item, index) => (
              <tr key={item._id} className="text-sm sm:text-base">
                {/* Index */}
                <td>{index + 1}</td>

                {/* Image */}
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-10 h-10 sm:w-12 sm:h-12">
                      <img src={item.pictureURL} alt="product" />
                    </div>
                  </div>
                </td>

                {/* Name */}
                <td className="max-w-[120px] sm:max-w-none truncate">
                  {item.toyName}
                </td>

                {/* Price */}
                <td>{item.price} $</td>

                {/* Rating */}
                <td className="flex items-center gap-1">
                  <IoStar className="text-yellow-400" /> {item.rating}
                </td>

                {/* Created At */}
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>

                {/* Actions */}
                <td>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                    <button
                      className="btn btn-sm btn-outline text-red-500 w-full sm:w-auto"
                      onClick={() => handleDelete(item._id)}
                    >
                      <BsFillTrash3Fill />
                    </button>

                    <button
                      className="btn btn-sm btn-outline text-green-500 w-full sm:w-auto"
                      onClick={() => openModal(item)}
                    >
                      <AiFillEdit />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box w-[95%] sm:w-96 max-w-full">
          <h3 className="font-bold text-lg mb-3">Edit Product</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Toy Name */}
            <input
              type="text"
              placeholder="Toy Name"
              className="input input-bordered w-full"
              {...register("toyName", { required: true })}
            />
            {errors.toyName && (
              <p className="text-red-500 text-sm">Toy name is required</p>
            )}

            {/* Price */}
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered w-full"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">Price is required</p>
            )}

            {/* Rating */}
            <input
              type="number"
              step="0.1"
              placeholder="Rating"
              className="input input-bordered w-full"
              {...register("rating", { required: true })}
            />
            {errors.rating && (
              <p className="text-red-500 text-sm">Rating is required</p>
            )}

            {/* Buttons */}
            <div className="modal-action flex flex-col sm:flex-row gap-2">
              <button
                type="submit"
                className="btn btn-primary w-full sm:w-auto"
              >
                Update
              </button>
              <button
                type="button"
                className="btn w-full sm:w-auto"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default SellTable;
