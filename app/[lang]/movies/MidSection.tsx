"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "./Card";
import { getDictionaries } from "@/lib/dictionaries";
import { Content, Local } from "@/i18n.config";
const LIMIT = 8;

export default function MidSection({
  page,
  setHasNext,
  lang,
}: {
  page: number;
  setHasNext: Function;
  lang: Local;
}) {
  const router = useRouter();
  const [text, setText] = useState<Content["movies"]["no_movies"]>();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let callFun = async () => {
      try {
        setLoading(true);
        let result = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND}/movies?_limit=${LIMIT}&_page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLoading(false);
        setMovies(result.data?.movies);
        setHasNext(result.data.hasMore);
      } catch (err: any) {
        if (err.name == "AxiosError" && err.response.status == 401) {
          localStorage.removeItem("token");
          router.replace(`/${lang}/login`);
        }
      }
    };
    callFun();
  }, [page, setHasNext, router, lang]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) return router.replace(`/${lang}/login`);
    getDictionaries(lang).then((data) => setText(data.movies.no_movies));
  }, [router, lang]);

  if (loading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-8 h-8 border-l-2 rounded-full border-l-primary animate-spin"></div>
      </div>
    );

  if (!movies.length)
    return (
      <div className="flex flex-col justify-center gap-6 items-center w-[min(1440px, 100vw)] p-32">
        <h2 className="text-[48px]">{text?.title}</h2>
        <button
          className="px-4 py-2 rounded-lg bg-primary hover:bg-opacity-20"
          onClick={(e) => router.push(`/${lang}/movies/create`)}
        >
          {text?.button}
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
