import { ReducerType } from "@reduxjs/toolkit";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const RangeSlider = ({ rangeVal, setRange }) => {
  return (
    <div className="border rounded-md shadow p-4 space-y-4">
      <p className="font-medium">Price Range</p>
      <div className="relative flex space-x-3">
        <Slider range value={[1000, 50000]} min={500} max={100000} onChange={(e) => setRange(e)} />
      </div>
      <div className="flex justify-between">
        <span className="border rounded-md p-1 text-center min-w-12">
          ${rangeVal[0]}
        </span>
              <span className="border rounded-md p-1 text-center min-w-12">${rangeVal[1]}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
