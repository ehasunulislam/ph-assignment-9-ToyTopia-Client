import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../Components/Hooks/useAxios";
import useAuthInfo from "../../../Components/Hooks/useAuthInfo";
import Lottie from "lottie-react";
import { assets } from "../../../assets/assets";

const PaymentSuccess = () => {
  const { user } = useAuthInfo();
  const axios = useAxios();
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get("productId");

    if (productId && user?.email) {
      axios
        .post("/payment-success", { productId, userEmail: user.email })
        .then((res) => {
          console.log("Payment status updated:", res.data);
          // React Query cache invalidate to update cart UI
          queryClient.invalidateQueries({ queryKey: ["cart", user.email] });
        })
        .catch((err) => {
          console.error("Failed to update payment status:", err);
        });
    }
  }, [location.search, user, axios, queryClient]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Lottie animationData={assets.paymentSuccess} loop={true} />
      <h2 className="text-[1rem] md:text-2xl mt-4">
        Your Payment is successful
      </h2>
      <p className="mt-2">Congratulation: {user.displayName}</p>
    </div>
  );
};

export default PaymentSuccess;
