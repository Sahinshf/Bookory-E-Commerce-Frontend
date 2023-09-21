import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import DealsItem from "./DealsItem";

const fetchBooks = async (search) => {
  const response = await axios
    .get(`https://localhost:7047/api/books`, {
      params: {
        search: search || "",
      },
    })
    .catch((error) => {
      console.log(error.response.data.message);
      return <div>{error.response.data.message}</div>;
    });
  return response.data;
};

const DealsList = () => {
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

  const limitedBooksData = booksData.slice(0, 3);

  return (
    <div className="">
      {limitedBooksData.map((item, index) => {
        return <DealsItem key={index} books={item} />;
      })}
    </div>
  );
};

export default DealsList;