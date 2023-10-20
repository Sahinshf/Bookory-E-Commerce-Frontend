import ResponseErrorMessage from "../../../components/ui/ResponseMessage/ResponseErrorMessage";
import { setResponseErrorMessage } from "../../../utils/setResponseErrorMessages";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { useUpdateAuthor } from "../../../service/authorService";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../../components/ui/FormInput/Input";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import * as yup from "yup";
import { showToastInfoMessage } from "../../../utils/toastUtils";

const UpdateAuthorForm = ({ author, handleClose }) => {
  const [responseErrors, setResponseErrors] = useState({});
  const [responseException, setResponseException] = useState();
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedNewImages, setSelectedNewImages] = useState([]);
  const [authorImages, setAuthorImages] = useState(author.images);

  const { mutate, isLoading } = useUpdateAuthor();

  const schema = yup.object().shape({
    name: yup.string().required().max(100),
    biography: yup.string().required().max(1000),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: author.name,
      biography: author.biography,
    },
  });

  const handleImageRemove = (indexToRemove) => {
    // Create new arrays without the selected image to be removed
    const updatedSelectedImages = selectedImages.filter(
      (_, index) => index !== indexToRemove,
    );
    const updatedSelectedNewImages = selectedNewImages.filter(
      (_, index) => index !== indexToRemove,
    );

    // Set the new arrays
    setSelectedImages(updatedSelectedImages);
    setSelectedNewImages(updatedSelectedNewImages);
  };

  const handleAuthorImageRemove = (indexToRemove) => {
    // Create a copy of the author images array
    const updatedAuthorImages = [...authorImages];

    // Remove the selected author image
    updatedAuthorImages.splice(indexToRemove, 1);

    // Update the state with the updated author images
    setAuthorImages(updatedAuthorImages);
  };

  //Convert ImagePath to File
  const convertImagePathToFile = async (image) => {
    //Fetch image from server
    const response = await fetch(
      `https://localhost:7047/assets/images/authors/${image}`,
      {
        mode: "cors",
      },
    );

    //Binary Large Object - hold multimedia objects
    const blob = await response.blob();
    const file = new File([blob], image, { type: blob.type });
    return file;
  };

  const onSubmit = async (formData) => {
    setResponseErrors({});

    //Convert ImagePath to File
    const imageFiles = await Promise.all(
      authorImages.map(async (imageObject) => {
        return await convertImagePathToFile(imageObject.image);
      }),
    );

    // Set images
    formData.prevImages = imageFiles;
    formData.newImages = selectedNewImages;

    formData.mainimageindex = 0;
    formData.id = author.id;

    mutate(formData, {
      onSuccess: () => {
        handleClose();
        showToastInfoMessage("Author successfully updated ");
      },

      onError: (res) => {
        if (res.response.data.errors) {
          const errorsData = setResponseErrorMessage(res.response.data.errors);
          setResponseErrors(errorsData);
        }

        if (res.response.data.statusCode === 409)
          setResponseException(res.response.data.message);
      },
    });
  };

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <>
      <div className="container z-10 mb-16 mt-32 max-w-[600px] rounded-[3rem] bg-white py-8">
        <h2 className="pb-8 text-center text-[4rem] text-black">
          Update Author
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-[20px]"
        >
          <div>
            <Input
              name="name"
              register={register}
              placeholder="Name"
              type="text"
              error={errors.name}
              responseError={responseErrors.name}
            />

            <Input
              name="biography"
              register={register}
              placeholder="Biography"
              type="text"
              error={errors.biography}
              responseError={responseErrors.biography}
            />

            <Input
              name="images"
              register={register}
              placeholder="Images"
              type="file"
              error={errors.images}
              responseError={responseErrors.images}
              onChangeFunction={(e) => {
                // Preview of uploaded images
                const file = e.target.files[0];
                const imageUrl = URL.createObjectURL(file);
                setSelectedImages((prev) => [...prev, imageUrl]);
                setSelectedNewImages((prev) => [...prev, file]);
              }}
            />

            <div className="flex flex-wrap gap-4">
              {authorImages.map((image, index) => {
                return (
                  <div
                    className="w-[100px] shrink-0 rounded-[1rem]"
                    key={index}
                    onClick={() => handleAuthorImageRemove(index)}
                  >
                    <img
                      src={`https://localhost:7047/assets/images/authors/${image.image}`}
                      className="aspect-[2.3/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
                      alt="Author cover"
                    />
                  </div>
                );
              })}
              {selectedImages?.map((image, index) => {
                return (
                  <div
                    className="w-[100px] shrink-0 rounded-[1rem]"
                    key={index}
                    onClick={() => handleImageRemove(index)}
                  >
                    <img
                      src={image}
                      className="aspect-[2.3/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
                      alt="Author cover"
                    />
                  </div>
                );
              })}
            </div>

            <ResponseErrorMessage message={responseException} />

            <button
              className="mx-auto my-8 flex items-center rounded-[2rem] bg-primaryText px-16 py-6 text-xl text-white active:scale-95 active:shadow-xl"
              type="submit"
            >
              Update Address
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateAuthorForm;
