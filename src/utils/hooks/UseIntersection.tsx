import React, { useEffect, useRef, useState } from "react";
export interface IUseIntersection {
  root?: Element | null | undefined;
  rootMargin: undefined | string;
  threshold: number | number[];
}

export const UseIntersection = ({
  root = null,
  rootMargin = undefined,
  threshold = 0,
}: IUseIntersection): [
  React.LegacyRef<HTMLDivElement>,
  IntersectionObserverEntry | undefined
] => {
  const [entrys, updateEntry] = useState<IntersectionObserverEntry>();
  const [node, setNode] = useState<Element | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new window.IntersectionObserver(
      ([entry]) => {
        updateEntry(entry);
      },
      { root, rootMargin, threshold }
    );
    const { current: currentObserver } = observer;
    if (node) currentObserver.observe(node);
    return () => currentObserver.disconnect();
  }, [node, root, rootMargin]);

  return [setNode as React.LegacyRef<HTMLDivElement>, entrys];
};
