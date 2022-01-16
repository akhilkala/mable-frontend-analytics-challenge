import React, { ReactElement } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useData } from "../context/DataContext";

interface Props {
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
  identifier: string;
}

export default function DateRange({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  identifier,
}: Props): ReactElement {
  const data = useData();

  return (
    <div className="date-range">
      <div className="date-range__group">
        <label htmlFor={`start-date-${identifier}`}>
          <h3>Start Date :</h3>
        </label>
        <DatePicker
          id={`start-date-${identifier}`}
          className="date-range__picker"
          selected={startDate}
          onChange={setStartDate}
          minDate={data?.getMinimumDate()}
          maxDate={data?.getMaximumDate()}
        />
      </div>
      <div className="date-range__group">
        <label htmlFor={`end-date-${identifier}`}>
          <h3>End Date :</h3>
        </label>
        <DatePicker
          id={`end-date-${identifier}`}
          className="date-range__picker"
          selected={endDate}
          onChange={setEndDate}
          minDate={data?.getMinimumDate()}
          maxDate={data?.getMaximumDate()}
        />
      </div>
    </div>
  );
}
