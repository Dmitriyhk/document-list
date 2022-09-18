import React from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./DatePicker.module.scss";

interface IDatepicker {
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  label: string;
}

export const DatePicker: React.FC<IDatepicker> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  label,
}) => {
  return (
    <div>
      {label}
      <div className={styles.datepicker_wrapper}>
        <div>
          <Datepicker
            calendarStartDay={1}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className={styles.datepicker}
          />
        </div>
        -
        <div>
          <Datepicker
            calendarStartDay={1}
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className={styles.datepicker}
          />
        </div>
      </div>
    </div>
  );
};
