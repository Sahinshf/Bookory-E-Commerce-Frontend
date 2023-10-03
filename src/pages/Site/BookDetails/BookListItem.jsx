import React, { useState } from "react";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";

const BookListItem = ({ book }) => {
  const bookRatingStars = [];

  for (let index = 0; index < 5; index++) {
    if (index < book.rating) {
      bookRatingStars.push(
        <Star key={index} color="#f65d4e" fill="#f65d4e" size={"14px"} />,
      );
    } else {
      bookRatingStars.push(<Star key={index} color="#f65d4e" size={"14px"} />);
    }
  }
  const [isHovered, setIsHovered] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div
      className="flex w-[50%] flex-col items-start justify-start rounded-[2rem] p-12 text-center minw-md:w-[33%]  min-[1200px]:w-[20%] min-[1360px]:w-1/6 "
      onMouseEnter={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
    >
      <div className="relative w-full shrink-0 rounded-[2rem] minw-md:w-[24rem] min-[1200px]:w-[18rem]">
        <img
          src={`https://localhost:7047/assets/images/books/${book.mainImage}`}
          className="aspect-[2.2/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
          alt="book cover"
        />

        <div
          className={`absolute bottom-4 right-4 flex flex-col ${
            isHovered ? " block" : "hidden"
          } `}
        >
          <div>
            <a
              className="animate__fadeInRight animate__animated animate__faster ease transform rounded-full bg-white p-2 transition-all duration-300 hover:bg-primaryText "
              href="#"
            >
              <Heart color="#000000" strokeWidth={"1px"} />
            </a>
          </div>

          <div>
            <a
              className="animate__fadeInRight animate__animated ease transform rounded-full  bg-white p-2 transition-all duration-300 hover:bg-primaryText"
              href="#"
            >
              <ShoppingCart color="#000000" strokeWidth={"1px"} />
            </a>
          </div>
        </div>
      </div>

      <div className={`flex flex-col items-start`}>
        <p className="mb-4 line-clamp-1 cursor-pointer overflow-hidden text-ellipsis pt-8 text-left tracking-widest hover:text-primaryText minw-xsm:text-[1.8rem]">
          {book.title}
        </p>

        <div className="mb-4 flex">{bookRatingStars}</div>

        <p className="mb-4 cursor-pointer text-lg font-semibold tracking-widest text-secondaryText hover:text-primaryText ">
          {book.author.name}
        </p>

        <span className="text-[2rem] tracking-widest text-primaryText">
          ${book.price}
        </span>
      </div>
    </div>
  );
};

export default BookListItem;