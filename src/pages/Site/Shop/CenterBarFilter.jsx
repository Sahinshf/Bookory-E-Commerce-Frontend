import React from "react";
import { Sliders } from "lucide-react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setPageSize,
  setSort,
} from "../../../features/bookFilter/bookFiltersSlice";

const CenterBarFilter = ({ setMuiDrawer }) => {
  const dispatch = useDispatch();

  const pageSize = useSelector((state) => state.filters.pageSize);
  const sortBy = useSelector((state) => state.filters.selectedSort);

  const handleSortType = (value) => {
    dispatch(setSort(value));
  };

  const handlePageSize = (pageSize) => {
    dispatch(setPageSize(pageSize));
  };

  const sortArray = [
    {
      value: "priceLowToHigh",
      name: "Price low to high",
    },
    {
      value: "priceHighToLow",
      name: "Price high to low",
    },
    {
      value: "averageRating",
      name: "Avarage rating",
    },
    {
      value: "newest",
      name: "Newest",
    },
    {
      value: "popularity",
      name: "Popularity",
    },
    {
      value: "onSale",
      name: "On Sale",
    },
  ];

  const pageSizes = [
    {
      value: 5,
      name: 5,
    },
    {
      value: 10,
      name: 10,
    },
    {
      value: 15,
      name: 15,
    },
    {
      value: 20,
      name: 20,
    },
    {
      value: 25,
      name: 25,
    },
    {
      value: 30,
      name: 30,
    },
  ];

  return (
    <div className="container border-b border-solid border-[#b8b8b8] pb-4 pt-24">
      <div className="flex items-center justify-between">
        <div
          className="flex cursor-pointer items-center gap-4"
          onClick={() => setMuiDrawer(true)}
        >
          <Sliders size={18} />
          <p className="text-xl font-semibold">Filter</p>
        </div>

        <div className="flex gap-4">
          <div>
            <FormControl
              sx={{
                width: 140,
                "& .MuiSelect-select": {
                  fontSize: 12,
                  padding: "10px 6px",
                  fontWeight: 600,
                },
              }}
            >
              <InputLabel
                id="sort-label"
                sx={{ fontSize: "12px", fontWeight: 600 }}
              >
                Default Sorting
              </InputLabel>
              <Select
                sx={{
                  boxShadow: "none",
                  fontSize: "16px",
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                }}
                labelId="sort-label"
                id="demo-simple-select"
                defaultValue="averageRating"
                value={sortBy}
                label="Default Sorting"
                onChange={(e) => handleSortType(e.target.value)}
              >
                {sortArray.map((menuItem, index) => (
                  <MenuItem
                    key={index}
                    value={menuItem.value}
                    sx={{
                      fontSize: "13px",
                    }}
                  >
                    {menuItem.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div>
            <FormControl
              sx={{
                width: 140,
                "& .MuiSelect-select": {
                  fontSize: 10,
                  padding: "10px 6px",
                  fontWeight: 600,
                },
              }}
            >
              <InputLabel
                id="demo-simple-select-label"
                sx={{ fontSize: "12px", fontWeight: 600 }}
              >
                Page Size
              </InputLabel>
              <Select
                sx={{
                  boxShadow: "none",
                  fontSize: "16px",
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pageSize}
                label="Page Size"
                onChange={(e) => handlePageSize(e.target.value)}
              >
                {pageSizes.map((menuItem, index) => (
                  <MenuItem
                    key={index}
                    value={menuItem.value}
                    sx={{
                      fontSize: "13px",
                    }}
                  >
                    {menuItem.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterBarFilter;
