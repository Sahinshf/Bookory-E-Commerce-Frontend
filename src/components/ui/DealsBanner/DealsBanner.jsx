import React from "react";

const DealsBanner = () => {
  return (
    <div className="mr-6 flex items-center justify-center rounded-[2rem] bg-[url(https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/h1-bg1.jpg)] bg-cover bg-no-repeat  p-8">
      <div className="min- flex flex-col items-center justify-center minw-md:mx-[8rem] minw-md:my-[6rem]">
        <div className="mb-12">
          <img
            src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/h1-img1.png"
            alt=""
          />
        </div>
        <div className="flex justify-between tracking-tighter ">
          <div className="text-white">
            <p className="mb-4 font-extralight">NEW YEAR , NEW BOOKS</p>
            <h2 className="pr-8 text-[3rem] leading-snug minw-lg:p-0 minw-lg:text-[3.6rem]  ">
              The Best New <br /> Books of January
            </h2>
          </div>
          <div className="mb-4 text-white ">
            <p>Hurry the deals run out soon.</p>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsBanner;
