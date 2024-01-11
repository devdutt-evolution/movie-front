"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import Paginate from "./Paginate";
import MidSection from "./MidSection";
import logoutLogo from "../../public/logout.svg";
import createLogo from "../../public/plus.svg";

export default function Movies() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  const logout: MouseEventHandler = (e) => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return (
    <div className="flex flex-col gap-14 md:gap-22 items-center w-[min(1440px, 100vw)] min-h-screen py-10 px-20">
      {/* nav */}
      <div className="flex items-center justify-between w-full my-4 md:my-8">
        <h2 className="flex text-2xl leading-tight md:text-5xl">
          My movies
          <p
            className="flex items-center justify-center ml-2 cursor-pointer"
            onClick={(e) => router.push("/movies/create")}
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
          <p className="invisible md:visible">Logout</p>
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
      <MidSection page={page} setHasNext={setHasNext} />
      {/* pagination */}
      <Paginate hasNext={hasNext} setPage={setPage} page={page} />
    </div>
  );
}
