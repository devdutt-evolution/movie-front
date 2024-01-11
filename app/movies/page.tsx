"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";
import Paginate from "./Paginate";
import Card from "./Card";
import Image from "next/image";
import logoutLogo from "../../public/logout.svg";
import createLogo from "../../public/plus.svg";
const LIMIT = 8;

let callApi = async (token: string, page: number) => {
  let movies = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND}/movies?_limit=${LIMIT}&_page=${page}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (movies.status == 200) return { data: movies.data, err: null };
  else return { data: null, err: movies.data?.message };
};

export default function Wrapped() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let result = await callApi(localStorage.getItem("token") as string, page);
      // if (result.err) console.error(result.err);
      setLoading(false);
      setMovies(result.data?.movies);
      setHasNext(result.data.hasMore);
    })();
  }, [page]);

  useEffect(() => {
    setLoading(true);
    let token = localStorage.getItem("token");
    if (!token) return router.push("/login");
    if (token) {
      (async () => {
        let result = await callApi(token, 1);
        if (result.err) console.error(result.err);
        setLoading(false);
        setMovies(result.data?.movies);
        setHasNext(result.data?.hasMore);
      })();
    }
  }, [router]);

  const logout: MouseEventHandler = (e) => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <div className="border-l-2 border-l-primary rounded-full animate-spin w-8 h-8"></div>
      </div>
    );

  if (!movies.length)
    return (
      <div className="flex flex-col justify-center gap-6 items-center h-screen w-[min(1440px, 100vw)]">
        <h2 className="text-[48px]">Your movie list is empty</h2>
        <button
          className="px-4 py-2 rounded-lg bg-primary hover:bg-opacity-80"
          onClick={(e) => router.push("/movies/create")}
        >
          Add a new movie
        </button>
      </div>
    );

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
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4">
        {movies.map((v, i) => (
          <Card movie={v} key={i} />
        ))}
      </div>
      {/* pagination */}
      <Paginate hasNext={hasNext} setPage={setPage} page={page} />
    </div>
  );
}
