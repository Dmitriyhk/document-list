import React, { useState } from "react";
import classNames from "classnames";
import { ReactComponent as Arrow } from "../../assets/img/arrow.svg";
import { ReactComponent as Close } from "../../assets/img/close.svg";
import styles from "./Select.module.scss";

export type optionsType = { text: string; value: string };

interface ISelect {
  placeholder?: string;
  options?: optionsType[];
  selectedOption: null | number;
  setSelectedOption: React.Dispatch<React.SetStateAction<number | null>>;
  disabled?: boolean;
  isReset?: boolean;
}

export const Select: React.FC<ISelect> = ({
  options,
  selectedOption,
  setSelectedOption,
  disabled,
  placeholder,
  isReset,
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const toggleOptions = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsOptionsOpen(!isOptionsOpen);
  };

  const setSelectedThenCloseDropdown = (index: number) => {
    setSelectedOption(index);
    setIsOptionsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button
          disabled={disabled}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOptionsOpen}
          className={classNames(styles.button, {
            [styles.button_open]: isOptionsOpen,
          })}
          onClick={(e) => toggleOptions(e)}
        >
          <Arrow
            className={classNames(styles.button_icon, {
              [styles.button_icon__expanded]: isOptionsOpen,
            })}
          />
          {isReset && selectedOption !== null && (
            <Close
              onClick={(e) => {
                e.stopPropagation();
                setSelectedOption(null);
              }}
              className={styles.button_close}
            />
          )}
          {options?.[selectedOption!]?.text ?? placeholder}
        </button>
        {isOptionsOpen && (
          <ul
            className={classNames(styles.options, {
              [styles.show]: isOptionsOpen,
            })}
            role="listbox"
            aria-activedescendant={options?.[selectedOption!]?.text}
            tabIndex={-1}
          >
            {options!.map((option, index) => (
              <li
                key={index}
                className={styles.options__item}
                data-list
                id={option?.text}
                role="option"
                aria-selected={selectedOption === index}
                tabIndex={index}
                onClick={() => {
                  setSelectedThenCloseDropdown(index);
                }}
              >
                {option?.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
