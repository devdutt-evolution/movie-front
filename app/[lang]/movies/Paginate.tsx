"use client";

import { Content, Local } from "@/i18n.config";
import { getDictionaries } from "@/lib/dictionaries";
import { MouseEventHandler, useEffect, useState } from "react";

export default function Paginate({
  hasNext,
  page,
  setPage,
  lang,
}: {
  hasNext: boolean;
  page: number;
  setPage: Function;
  lang: Local;
}) {
  const [text, setText] = useState<Content["movies"]>();

  useEffect(() => {
    getDictionaries(lang).then((data) => setText(data.movies));
  }, [lang]);

  const increasePage: MouseEventHandler = (e) => {
    if (hasNext) setPage(page + 1);
  };
  const reducePage: MouseEventHandler = (e) => {
    if (page > 1) setPage(page - 1);
  };

  if (page == 1 && !hasNext) return <></>;

  return (
    <div className="flex items-center justify-center w-full gap-1 my-8">
      <div className="flex items-center justify-center gap-3">
        <p
          className={`p-2 rounded-lg text-sm font-bold  hover:text-primary ${
            page == 1 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={reducePage}
        >
          {text?.prev}
        </p>
        {!hasNext && page > 1 && (
          <p
            className="p-2 px-3 text-sm font-bold rounded-lg cursor-pointer bg-card"
            onClick={reducePage}
          >
            {page - 1}
          </p>
        )}
        <p className="p-2 px-3 text-sm font-bold rounded-lg cursor-pointer bg-primary">
          {page}
        </p>
        {hasNext && (
          <p
            className="p-2 px-3 text-sm font-bold rounded-lg cursor-pointer bg-card"
            onClick={increasePage}
          >
            {page + 1}
          </p>
        )}
        <p
          className={`p-2 font-bold rounded-lg hover:text-primary text-sm ${
            hasNext ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          onClick={increasePage}
        >
          {text?.next}
        </p>
      </div>
    </div>
  );
}
