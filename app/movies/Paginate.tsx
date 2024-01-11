"use client";

import { MouseEventHandler } from "react";

export default function Paginate({
  hasNext,
  page,
  setPage,
}: {
  hasNext: boolean;
  page: number;
  setPage: Function;
}) {
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
          className={`p-2 rounded-lg cursor-pointer hover:shadow-lg border-1 hover:border-white hover:text-primary text-sm ${
            page == 1 && "opacity-0"
          }`}
          onClick={reducePage}
        >
          Prev
        </p>
        <input
          className="p-1 px-2 rounded-lg bg-input w-[40px] outline-none remove-arrow"
          type="number"
          value={page}
          disabled={true}
        />
        <p
          className={`p-2 cursor-pointer rounded-lg hover:shadow-lg border-1 hover:border-white hover:text-primary text-sm ${
            !hasNext && "opacity-0"
          }`}
          onClick={increasePage}
        >
          Next
        </p>
      </div>
    </div>
  );
}
