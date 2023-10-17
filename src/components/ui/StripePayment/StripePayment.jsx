import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { authApi } from "../../../api";
import LoadingSpinner from "../Loading/LoadingSpinner";
import logo from "../../../assets/icons/logo.svg";
import { useGetAllAddress } from "../../../service/addressService";
import { add } from "date-fns";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#fff" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const StripePayment = ({ email, addressId }) => {
  console.log(
    "🚀 ~ file: StripePayment.jsx:30 ~ StripePayment ~ addressId:",
    addressId,
  );
  console.log(
    "🚀 ~ file: StripePayment.jsx:30 ~ StripePayment ~ email:",
    email,
  );
  const stripe = useStripe();
  const elements = useElements();
  const queryClient = useQueryClient();

  const checkout = useMutation((data) => authApi.post("order", data), {
    onSuccess: () => {
      queryClient.invalidateQueries("payment");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    console.log(error);
    if (!error) {
      const { id } = paymentMethod;
      try {
        checkout.mutate({
          StripeEmail: email,
          StripeToken: id,
          AddressId: addressId,
        });
      } catch (error) {
        console.log(error);
      }
    }
    console.log("submit");
  };

  if (checkout.isLoading)
    return <LoadingSpinner isLoading={checkout.isLoading} />;

  return (
    <form
      className="container my-40 w-[600px] rounded-[3rem] bg-white px-10 py-16 text-black"
      onSubmit={handleSubmit}
    >
      <div>
        <div className="mb-16 flex items-center ">
          <img src={logo} alt="" className="w-1/2" />
        </div>

        <fieldset className="my-8 rounded-3xl bg-primaryText px-8">
          <div className="gap-8 px-4 py-8">
            <CardElement options={CARD_OPTIONS} />
          </div>
        </fieldset>

        <button
          className="mx-auto mt-16 flex items-center rounded-[2rem] border border-solid border-secondaryText bg-white px-16 py-6 text-xl text-primaryText active:scale-95 active:shadow-xl"
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
      </div>
    </form>
  );
};

export default StripePayment;
