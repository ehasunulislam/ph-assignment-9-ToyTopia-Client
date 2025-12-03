import React from "react";
import { BsTrash3Fill } from "react-icons/bs";
import useAxios from "../Hooks/useAxios";
import useAuthInfo from "../Hooks/useAuthInfo";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const CartTable = () => {
  const { user } = useAuthInfo();
  const axios = useAxios();
  const queryClient = useQueryClient();

  const { data = [], isLoading, } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/add-to-cart/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (productId) => {
    if (!user?.email) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this item from cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/add-to-cart/${user.email}/${productId}`);
        Swal.fire("Deleted!", "Item removed from your cart.", "success");
        queryClient.invalidateQueries({ queryKey: ["cart", user.email] });
      } catch (err) {
        Swal.fire("Error", "Failed to delete the item.", err);
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>Toy name</th>
            <th>My email</th>
            <th>Product Id</th>
            <th>Price</th>
            <th>Pay</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={item.pictureURL} alt={item.toyName} />
                    </div>
                  </div>
                </div>
              </td>
              <td>{item.toyName}</td>
              <td>{item.userEmail}</td>
              <td>{item.productId}</td>
              <td>{item.price}$</td>
              <td>
                {item.paid ? (
                  <button className="btn btn-sm bg-black text-white cursor-not-allowed">
                    Paid
                  </button>
                ) : (
                  <Link
                    to={`/dashboard/payment/${item._id}`}
                    className="btn btn-sm bg-green-400"
                  >
                    Pay
                  </Link>
                )}
              </td>
              <td>
                <button
                  className="btn btn-sm text-red-500"
                  onClick={() => handleDelete(item.productId)}
                >
                  <BsTrash3Fill />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
