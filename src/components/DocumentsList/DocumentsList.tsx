import React, { useEffect, useState } from "react";

import {
  IDocumentObject,
  useGetDocumentsListQuery,
} from "../../redux/api/documentApi";
import { UseIntersection } from "../../utils/hooks/UseIntersection";
import DocumentItem from "../DocumentItem";

import styles from "./DocumentsList.module.scss";

interface IList {
  idValue: string;
  titleValue: string;
  startDate: Date | null;
  endDate: Date | null;
  selectedOptionValue: null | number;
  selectedOptionDirection: null | number;
}

const changeDate = (date: string) =>
  +new Date(date.replace(/(\d+).(\d+).(\d+?)/g, "$2.$1.$3"));

const sortingData = (
  arr: IDocumentObject[],
  sortName: number | null,
  sortDirection: number | null
) => {
  if (sortName === 0) {
    arr.sort((a, b) => {
      return sortDirection === 0
        ? changeDate(b.date) - changeDate(a.date)
        : changeDate(a.date) - changeDate(b.date);
    });
  }
  if (sortName === 1) {
    arr.sort((a, b) => {
      return sortDirection === 0
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
  }
  return arr;
};

export const DocumentsList: React.FC<IList> = ({
  idValue,
  titleValue,
  startDate,
  endDate,
  selectedOptionValue,
  selectedOptionDirection,
}) => {
  const [refDocument, doc] = UseIntersection({
    threshold: 1,
    rootMargin: "0px",
  });
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetDocumentsListQuery("");

  const [filterData, setFilterData] = useState<IDocumentObject[] | []>([]);
  useEffect(() => {
    if (data) {
      setFilterData(data);
    }
  }, [data]);
  useEffect(() => {
    if (
      doc?.isIntersecting &&
      !(data?.slice(0, page * 10).length === data?.length) &&
      !isFetching
    ) {
      setPage((state) => state + 1);
    }
  }, [doc?.isIntersecting]);

  useEffect(() => {
    if (data) {
      if (!idValue) {
        setFilterData(
          sortingData(
            [...data].filter((el) => {
              return (
                el.title.toLowerCase().includes(titleValue.toLowerCase()) &&
                changeDate(el.date) >= (startDate || Number.MIN_VALUE) &&
                changeDate(el.date) <= (endDate || Number.MAX_VALUE)
              );
            }),
            selectedOptionValue,
            selectedOptionDirection
          )
        );
      } else {
        setFilterData([...data].filter((el) => el.id === idValue));
      }
    }
  }, [
    titleValue,
    idValue,
    endDate,
    startDate,
    data,
    selectedOptionValue,
    selectedOptionDirection,
  ]);

  if (isFetching) {
    return (
      <div className={styles.loader_wrapper}>
        <span className={styles.loader}></span>
      </div>
    );
  }
  return (
    <div className={styles.list}>
      {filterData.length > 0 ? (
        filterData
          .slice(0, 10 * page)
          .map((el) => <DocumentItem key={el.id} data={el} />)
      ) : (
        <span>
          По вашему запросу нет документов. Попробуйте изменить фильтры или
          поиск.
        </span>
      )}
      <div ref={refDocument} />
    </div>
  );
};
