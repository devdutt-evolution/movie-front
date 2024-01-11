"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "./Card";
const LIMIT = 8;

let callApi = async (token: string, page: number) => {
  let movies = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND}/movies?_limit=${LIMIT}&_page=${page}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (movies.status == 200) return { data: movies.data, err: null };
  else return { data: null, err: movies.data?.message };
};

export default function MidSection({
  page,
  setHasNext,
}: {
  page: number;
  setHasNext: Function;
}) {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
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
  }, [page, setHasNext]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) return router.push("/login");
  }, [router]);

  if (loading)
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="w-8 h-8 border-l-2 rounded-full border-l-primary animate-spin"></div>
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
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">
      {movies.map((v, i) => (
        <Card movie={v} key={i} />
      ))}
    </div>
  );
}
