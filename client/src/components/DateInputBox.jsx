import { CalendarDays } from "lucide-react";
import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DateInputBox = ({ date, setDate }) => {
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    // <button
    //   className="example-custom-input"
    //   onClick={(event) => {
    //     event.preventDefault();
    //     onClick(event);
    //   }}
    //   ref={ref}
    // >
    //   {value}
    //   </button>
    <input
      className="outline-none text-neutral-500"
      type="text"
      value={value}
      placeholder="Pick a date"
      readOnly
      ref={ref}
      onClick={(event) => {
        event.preventDefault();
        onClick(event);
      }}
    />
  ));

  return (
    <div className="border rounded w-full h-10 px-4 flex items-center justify-between space-x-3">
      <DatePicker
        placeholderText="Pick a Date"
        selected={date}
        onChange={(date) => setDate(date)}
        todayButton="Today"
        //   showMonthDropdown
        //   showYearDropdown
        customInput={<ExampleCustomInput />}
      />
      <CalendarDays size={20} strokeWidth={1.5} />
    </div>
  );
};

export default DateInputBox;
