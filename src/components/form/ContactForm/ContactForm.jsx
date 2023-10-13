import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const ContactForm = () => {
  const schema = yup.object().shape({
    name: yup.string().required().max(50),
    email: yup.string().required().email(),
    message: yup.string().required().max(500),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //   const { mutate, isLoading } = useRegister();

  const onSubmit = (formData) => {
    console.log(
      "🚀 ~ file: ContactForm.jsx:29 ~ onSubmit ~ formData:",
      formData,
    );
  };

  //   if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <>
      <div className="container mb-16 mt-32 w-1/2 pl-20">
        <div>
          <h2 className="pb-8 text-left text-[2.6rem]">
            We Would Love To Hear From You.
          </h2>
          <p className="text-xl font-normal text-secondartTextBold">
            Your email address will not be published. Required fields are marked
            *
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-[20px]"
        >
          <div>
            <input
              {...register("name")}
              type="text"
              placeholder="Name*"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />
            <p>{errors.name?.message}</p>

            <input
              {...register("email")}
              type="text"
              placeholder="Email*"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />
            <p>{errors.email?.message}</p>

            <input
              {...register("message")}
              type="text"
              placeholder="Message*"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />
            <p>{errors.message?.message}</p>

            <button
              className="mx-auto my-8 flex items-center rounded-[2rem] bg-primaryText px-16 py-6 text-xl text-white active:scale-95 active:shadow-xl"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
