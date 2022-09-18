import React from "react";
import { IDocumentObject } from "../../redux/api/documentApi";
import Accordion from "../../ui/Accordion";

import styles from "./DocumentItem.module.scss";

export const DocumentItem: React.FC<{ data: IDocumentObject }> = ({ data }) => {
  return (
    <div className={styles.item}>
      <Accordion buttonContent={data?.title!}>
        <div className={styles.item_content}>
          <p>
            id: <span>{data?.id}</span>
          </p>
          <p>
            Дата: <span>{data?.date}</span>
          </p>
          <p>
            Размер: <span>{data?.size} Mb</span>
          </p>
          <p>
            Тип: <span>{data?.type}</span>
          </p>
        </div>
      </Accordion>
    </div>
  );
};
