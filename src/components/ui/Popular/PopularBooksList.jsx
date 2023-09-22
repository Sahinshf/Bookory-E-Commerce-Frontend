import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PopularBookItem from "./PopularBookItem";

const fetchBooks = async (search) => {
  const response = await axios
    .get(`https://localhost:7047/api/books`)
    .catch((error) => {
      console.log(error.response.data.message);
      return <div>{error.response.data.message}</div>;
    });
  return response.data;
};

const PopularBooksList = () => {
  const {
    data: booksData,
    isLoading: booksLoading,
    isError: booksError,
  } = useQuery({ queryKey: ["books"], queryFn: fetchBooks });

  if (booksLoading) {
    return <div>Loading...</div>;
  }

  if (booksError) {
    return <div>Error fetching data</div>;
  }

  const limitedBooksData = booksData.slice(0, 8);

  return (
    <div className="flex flex-wrap max-[992px]:justify-around">
      {limitedBooksData.map((item, index) => {
        return <PopularBookItem key={index} books={item} />;
      })}
    </div>
  );
};

export default PopularBooksList;
