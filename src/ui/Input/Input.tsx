import React from "react";
import styles from "./Input.module.scss";

interface IInput {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  description?: React.ReactElement;
}

const regular = /^[?!,.а-яА-ЯёЁa-zA-Z0-9\s]+$/;

export const Input: React.FC<IInput> = ({
  value,
  setValue,
  label,
  description,
}) => (
  <label>
    {label}
    <input
      className={styles.input}
      value={value}
      onChange={(e) => {
        if (
          (e.target.value.length < 300 && e.target.value.match(regular)) ||
          e.target.value === ""
        ) {
          setValue(e.target.value);
        }
      }}
    />
    {description}
  </label>
);
