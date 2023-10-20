import React from "react";
import ResponseErrorMessage from "../../ui/ResponseMessage/ResponseErrorMessage";

const Input = ({
  name,
  register,
  placeholder,
  type,
  error,
  responseError,
  multiple,
  onChangeFunction,
}) => {
  return (
    <div>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        multiple={multiple ? true : false}
        className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
        onChange={onChangeFunction}
      />
      <ResponseErrorMessage message={error?.message} />
      <ResponseErrorMessage message={responseError} />
    </div>
  );
};

export default Input;
