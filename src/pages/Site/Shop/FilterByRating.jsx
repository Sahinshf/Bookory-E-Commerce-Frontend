import React, { useCallback, useMemo } from "react";
import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setRating } from "../../../features/bookFilter/bookFiltersSlice";

const FilterByRating = () => {
  const selectedRating = useSelector((state) => state.filters.selectedRating);
  const dispatch = useDispatch();

  const handleRatingChange = useCallback(
    (value) => {
      if (value === selectedRating) {
        dispatch(setRating(null));
      } else {
        dispatch(setRating(value));
      }
    },
    [selectedRating],
  );

  const renderStars = useMemo(
    () => (ratingValue) => {
      const starArray = [...Array(ratingValue)];
      return starArray.map((_, index) => (
        <Star
          key={`star-rating-${ratingValue}-${index}`}
          color="#f65d4e"
          fill={selectedRating === ratingValue ? "#f65d4e" : "#fff"}
          size={"14px"}
        />
      ));
    },
    [selectedRating],
  );

  return (
    <div className="mb-8 pt-20">
      <h5 className="mb-12 border-b border-solid border-[#999999] pb-6 text-2xl font-semibold">
        Review Rating
      </h5>
      <div>
        {[5, 4, 3].map((ratingValue) => (
          <label
            key={`rating-label-${ratingValue}`}
            htmlFor={`rating${ratingValue}`}
            className="cursor-pointer"
          >
            {console.log(ratingValue)}
            <input
              type="radio"
              value={ratingValue}
              id={`rating${ratingValue}`}
              name="rating"
              className="invisible h-0 w-0"
              onClick={() => handleRatingChange(ratingValue)}
            />
            <div className="flex gap-2">{renderStars(ratingValue)}</div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterByRating;
