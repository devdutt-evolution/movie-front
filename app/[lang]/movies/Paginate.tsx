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

  return (
    <div className="flex items-center justify-center w-full gap-1 my-8">
      <div className="flex items-center justify-center gap-3">
        <p
          className={`p-2 rounded-lg cursor-pointer text-sm font-bold hover:shadow-lg border-1 hover:border-white hover:text-primary ${
            page == 1 && "opacity-0"
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
          className={`p-2 cursor-pointer font-bold rounded-lg hover:shadow-lg border-1 hover:border-white hover:text-primary text-sm ${
            !hasNext && "opacity-0"
          }`}
          onClick={increasePage}
        >
          {text?.next}
        </p>
      </div>
    </div>
  );
}
