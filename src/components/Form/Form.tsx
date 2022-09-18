import React, { useEffect } from "react";
import DatePicker from "../../ui/DatePicker";
import Input from "../../ui/Input";
import Select from "../../ui/Select";

import styles from "./Form.module.scss";

interface IForm {
  idValue: string;
  setIdValue: React.Dispatch<React.SetStateAction<string>>;
  titleValue: string;
  setTitleValue: React.Dispatch<React.SetStateAction<string>>;
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedOptionValue: null | number;
  setSelectedOptionValue: React.Dispatch<React.SetStateAction<number | null>>;
  selectedOptionDirection: null | number;
  setSelectedOptionDirection: React.Dispatch<
    React.SetStateAction<number | null>
  >;
}

export const Form: React.FC<IForm> = ({
  idValue,
  setIdValue,
  titleValue,
  setTitleValue,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedOptionValue,
  setSelectedOptionValue,
  selectedOptionDirection,
  setSelectedOptionDirection,
}) => {
  useEffect(() => {
    if (selectedOptionValue === null) {
      setSelectedOptionDirection(null);
    } else {
      setSelectedOptionDirection(0);
    }
  }, [selectedOptionValue]);

  return (
    <div className={styles.form}>
      <Input
        label="ID документа"
        setValue={setIdValue}
        value={idValue}
        description={
          <span className={styles.form_input__description}>
            Если заполнено поле <span>ID документа</span>, все остальные поля
            будут проигнорированы.
          </span>
        }
      />
      <DatePicker
        label="Создан"
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <Input
        label="Название документа"
        setValue={setTitleValue}
        value={titleValue}
      />

      <div>
        Сортировка
        <div className={styles.form_selects}>
          <Select
            isReset
            placeholder="Значение"
            options={[
              {
                text: "Создан",
                value: "date",
              },
              { text: "Название", value: "name" },
            ]}
            selectedOption={selectedOptionValue}
            setSelectedOption={setSelectedOptionValue}
          />
          <Select
            placeholder="Направление"
            options={[
              {
                text: selectedOptionValue === 0 ? "По убыванию" : "A-Z",
                value: "desc",
              },
              {
                text: selectedOptionValue === 0 ? "По возрастанию" : "Z-A",
                value: "asc",
              },
            ]}
            selectedOption={selectedOptionDirection}
            setSelectedOption={setSelectedOptionDirection}
            disabled={selectedOptionValue === null}
          />
        </div>
      </div>
    </div>
  );
};
