import React, { ReactElement } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useData } from "../context/DataContext";

interface Props {
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
  onApply: () => Promise<void>;
}

export default function DateRange({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onApply,
}: Props): ReactElement {
  const data = useData();

  return (
    <div className="date-range">
      <div className="date-range__group">
        <label htmlFor="start-date-pie">
          <h3>Start Date :</h3>
        </label>
        <DatePicker
          id="start-date-pie"
          className="date-range__picker"
          selected={startDate}
          onChange={setStartDate}
          minDate={data?.getMinimumDate()}
          maxDate={data?.getMaximumDate()}
        />
      </div>
      <div className="date-range__group">
        <label htmlFor="end-date-pie">
          <h3>End Date :</h3>
        </label>
        <DatePicker
          id="end-date-pie"
          className="date-range__picker"
          selected={endDate}
          onChange={setEndDate}
          minDate={data?.getMinimumDate()}
          maxDate={data?.getMaximumDate()}
        />
      </div>
      <button onClick={onApply} className="btn date-range__btn">
        Apply
      </button>
    </div>
  );
}
