import React from "react";
import { Star } from "lucide-react";

const DealsItem = (props) => {
  const filledStars = [];
  const emptyStars = [];

  for (let index = 0; index < props.books.rating; index++) {
    filledStars.push(
      <Star key={index} color="#f65d4e" fill="#f65d4e" size={"14px"} />,
    );
  }

  for (let index = 0; index < 5 - props.books.rating; index++) {
    emptyStars.push(<Star key={index} color="#f65d4e" size={"14px"} />);
  }
  return (
    <div className="flex items-start justify-start bg-white px-6 py-6 text-center minw-md:w-[33rem]">
      <div className="mr-12 h-[18rem] w-full max-w-[13rem]">
        <img
          src={`https://localhost:7047/assets/images/books/${props.books.mainImage}`}
          className="h-full w-full cursor-pointer rounded-[2rem] object-cover"
          alt="book cover"
        />
      </div>
      <div className="flex flex-col items-start justify-start ">
        <p className="mb-4 line-clamp-1 cursor-pointer overflow-hidden  text-ellipsis pt-8 text-left hover:text-primaryText">
          {props.books.title}
        </p>
        <div className="mb-4 flex">
          {filledStars}
          {emptyStars}
        </div>

        <p className="mb-4 cursor-pointer text-lg font-semibold tracking-widest text-secondaryText hover:text-primaryText">
          {props.books.author.name}
        </p>
        <span className="text-[2rem] tracking-widest text-primaryText">
          ${props.books.price}
        </span>
      </div>
    </div>
  );
};

export default DealsItem;
