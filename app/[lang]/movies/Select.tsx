"use client";

import { Local, i18n } from "@/i18n.config";
import Image from "next/image";
import Expand from "@/public/expand.svg";
import { useState } from "react";
import Link from "next/link";

export default function Select({ lang }: { lang: Local }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="flex bg-card rounded-lg px-3 py-2 relative"
        onClick={(e) => setOpen((o) => !o)}
      >
        {!open ? (
          <p className="font-bold text-sm px-2 my-1">
            <span className="min-w-[55px] block">
              {lang == "en" ? "English" : lang == "hn" ? "Hindi" : "Gujarati "}
            </span>
          </p>
        ) : (
          <div className="absolute top-0 right-0 px-3 py-2 bg-card rounded-lg w-full ">
            {i18n.locales.map((locale) => {
              return (
                <Link
                  href={`/${locale}/movies`}
                  key={locale}
                  // className='rounded-md border bg-black px-3 py-2 text-white'
                >
                  <p className="font-bold text-sm px-2 py-1 w-full cursor-pointer bg-card rounded-md hover:bg-slate-500 ">
                    {locale == "en"
                      ? "English"
                      : locale == "hn"
                      ? "Hindi"
                      : "Gujarati "}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
        <Image
          src={Expand}
          width={30}
          height={30}
          alt="arrow"
          className={open ? "rotate-180 ml-[70px]" : ""}
        />
      </div>
    </>
  );
}
