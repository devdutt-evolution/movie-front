"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";
import Paginate from "./Paginate";
import MidSection from "./MidSection";
import logoutLogo from "@/public/logout.svg";
import createLogo from "@/public/plus.svg";
import { Content, Local } from "@/i18n.config";
import { getDictionaries } from "@/lib/dictionaries";

export default function Movies({ params }: { params: { lang: Local } }) {
  const router = useRouter();
  const [text, setText] = useState<Content["movies"]>();
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    getDictionaries(params.lang).then((data) => setText(data.movies));
  }, [params]);

  const logout: MouseEventHandler = (e) => {
    localStorage.removeItem("token");
    router.replace(`/${params.lang}/login`);
  };

  return (
    <div className="flex flex-col gap-14 md:gap-22 items-center w-[min(1440px, 100vw)] min-h-screen py-10 px-20">
      {/* nav */}
      <div className="flex items-center justify-between w-full my-4 md:my-8">
        <h2 className="flex text-2xl leading-tight md:text-5xl">
          {text?.my_movies}
          <p
            className="flex items-center justify-center ml-2 cursor-pointer"
            onClick={(e) => router.push(`/${params.lang}/movies/create`)}
          >
            <Image
              src={createLogo}
              width={32}
              height={32}
              alt="create logo"
              className="fill-white stroke-white"
            />
          </p>
        </h2>
        <div
          className="flex gap-2 text-lg cursor-pointer md:text-2xl"
          onClick={logout}
        >
          <p className="invisible md:visible">{text?.logout}</p>
          <Image
            src={logoutLogo}
            width={25}
            height={25}
            alt="logout"
            className="md:w-9 md:h-9"
          />
        </div>
      </div>
      {/* cards */}
      <MidSection lang={params.lang} page={page} setHasNext={setHasNext} />
      {/* pagination */}
      <Paginate
        hasNext={hasNext}
        setPage={setPage}
        page={page}
        lang={params.lang}
      />
    </div>
  );
}
