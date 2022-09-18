import React, { useState } from "react";
import classNames from "classnames";
import { ReactComponent as Arrow } from "../../assets/img/arrow.svg";
import styles from "./Accordion.module.scss";

interface IAccordion {
  buttonContent: string;
  children: React.ReactElement;
}

export const Accordion: React.FC<IAccordion> = ({
  buttonContent,
  children,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <div className={styles.accordion}>
      <button
        className={classNames(styles.accordion_button, {
          [styles.accordion_button__active]: isActive,
        })}
        onClick={() => setIsActive((state) => !state)}
      >
        {buttonContent}
        <Arrow
          className={classNames(styles.accordion_button__up, {
            [styles.accordion_button__down]: isActive,
          })}
        />
      </button>
      {isActive && <div>{children}</div>}
    </div>
  );
};
