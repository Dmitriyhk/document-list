import React, { useState } from "react";
import DocumentsList from "../../components/DocumentsList";
import Form from "../../components/Form";
import Header from "../../components/Header";

import styles from "./DocumentSearch.module.scss";

export const DocumentSearch = () => {
  const [idValue, setIdValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedOptionValue, setSelectedOptionValue] = useState<null | number>(
    null
  );
  const [selectedOptionDirection, setSelectedOptionDirection] = useState<
    null | number
  >(null);
  return (
    <div>
      <Header />
      <div className={styles.content}>
        <Form
          idValue={idValue}
          setIdValue={setIdValue}
          titleValue={titleValue}
          setTitleValue={setTitleValue}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          selectedOptionValue={selectedOptionValue}
          setSelectedOptionValue={setSelectedOptionValue}
          selectedOptionDirection={selectedOptionDirection}
          setSelectedOptionDirection={setSelectedOptionDirection}
        />
        <DocumentsList
          idValue={idValue}
          titleValue={titleValue}
          startDate={startDate}
          endDate={endDate}
          selectedOptionValue={selectedOptionValue}
          selectedOptionDirection={selectedOptionDirection}
        />
      </div>
    </div>
  );
};
