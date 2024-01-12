"use client";

import Image from "next/image";
import download from "@/public/download.png";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Content, Local } from "@/i18n.config";
import { getDictionaries } from "@/lib/dictionaries";

type FormBody = {
  title: string;
  year: number;
};
let backPath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BACKEND}/posters/${path}`;

export default function Edit({
  params,
}: {
  params: { movieId: string; lang: Local };
}) {
  const router = useRouter();
  const [text, setText] = useState<Content["movies"]["movieId"]>();
  const [file, setFile] = useState("");
  const [fileObject, setFileObject] = useState(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [initail, setInitail] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [defaultPath, setDefaultPath] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, submitCount },
    reset,
  } = useForm<FormBody>();

  const submitForm = (data: FormBody) => {
    if (!file && !initail) return;

    axios
      .put(
        `${process.env.NEXT_PUBLIC_BACKEND}/movies/${params.movieId}`,
        {
          title: data.title,
          year: data.year,
          path: initail ? defaultPath : file,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((data) => {
        if (data.status == 200) router.push(`/${params.lang}/movies`);
      })
      .catch((err) => {
        if (err.name == "AxiosError" && err.response.status == 401) {
          localStorage.removeItem("token");
          router.replace(`/${params.lang}/login`);
        } else if (err.name == "AxiosError" && err.response.status == 400) {
          setError(err.response.data.message);
        } else if (err.name == "AxiosError" && err.response.status == 500) {
          setError("Internal Server Error");
        }
      });
  };

  useEffect(() => {
    function previewFile() {
      if (fileObject) {
        const reader = new FileReader();

        if (fileObject) reader.readAsDataURL(fileObject);

        reader.onload = (readerEvent) => {
          let obj: any = readerEvent?.currentTarget;
          setImagePreview(obj.result);
        };
      }
    }
    previewFile();
  }, [fileObject]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let token = localStorage.getItem("token");
      if (!token) return router.replace(`/${params.lang}/login`);
      getDictionaries(params.lang).then((data) => setText(data.movies.movieId));
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND}/movies/${params.movieId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((data) => data.data.movie)
        .then((data) => {
          reset({
            title: data.title,
            year: data.year,
          });
          setLoading(false);
          setDefaultPath(data.path);
        })
        .catch((err) => {
          setLoading(false);
          if (err.name == "AxiosError" && err.response.status == 401) {
            localStorage.removeItem("token");
            router.replace(`/${params.lang}/login`);
          } else if (err.name == "AxiosError" && err.response.status == 400) {
            setError(err.response.data.message);
          } else if (err.name == "AxiosError" && err.response.status == 500) {
            setError("Internal Server Error");
          }
        });
    })();
  }, [reset, params, router]);

  if (loading)
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="w-8 h-8 border-l-2 rounded-full border-l-primary animate-spin"></div>
      </div>
    );

  return (
    <div className="w-[min(1440px, 100vw)] min-h-screen py-10 px-20">
      <div className="">
        <h2 className="text-4xl font-semibold py-14 md:py-20">{text?.edit}</h2>
        <form
          className="grid justify-around w-full grid-cols-1 gap-4 md:grid-cols-2 "
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="bg-input border-2 border-dashed border-white flex flex-col justify-center items-center w-full sm:w-[75%] rounded-lg h-[30vh] shadow-lg cursor-pointer md:h-[50vh] relative">
            {initail ? (
              <>
                <Image
                  width={162}
                  height={300}
                  className="object-cover w-full h-full rounded-lg"
                  src={backPath(defaultPath)}
                  alt="preview"
                />
                <div
                  className="hover:bg-red w-[32px] h-[32px] z-1 top-0 right-0 p-1 absolute flex justify-center items-center bg-red rounded-lg z-[4]"
                  onClick={(e) => {
                    setInitail(false);
                  }}
                >
                  <p>X</p>
                </div>
              </>
            ) : !imagePreview ? (
              <>
                <Image
                  src={download}
                  alt="upload logo"
                  width={24}
                  height={24}
                  className="rounded-lg"
                />
                <p className="text-sm">{text?.drop_file}</p>
                {submitCount > 0 && !file && (
                  <p className="text-sm text-red">Poster is required</p>
                )}
              </>
            ) : (
              <Image
                width={162}
                height={300}
                className="object-cover w-full h-full"
                src={imagePreview}
                alt="preview"
              />
            )}
            <input
              type="file"
              id="poster"
              accept="image/*"
              onChange={(event) => {
                if (
                  event?.currentTarget &&
                  event.currentTarget?.files &&
                  event.currentTarget.files[0]
                ) {
                  setLoading(true);
                  setInitail(false);
                  const formData = new FormData();
                  formData.append("poster", event.currentTarget.files[0]);
                  let obj: any = event.currentTarget.files[0];
                  setFileObject(obj);
                  axios
                    .post(
                      `${process.env.NEXT_PUBLIC_BACKEND}/fileupload`,
                      formData,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    )
                    .then((data) => {
                      if (data.status == 200) return data.data.path;
                    })
                    .then((path) => {
                      setFile(path);
                      setLoading(false);
                    })
                    .catch((err) => {
                      setLoading(false);
                      if (
                        err.name == "AxiosError" &&
                        err.response.status == 401
                      ) {
                        localStorage.removeItem("token");
                        router.replace(`/${params.lang}/login`);
                      } else if (
                        err.name == "AxiosError" &&
                        err.response.status == 400
                      ) {
                        setError(err.response.data.message);
                      } else if (
                        err.name == "AxiosError" &&
                        err.response.status == 500
                      ) {
                        setError("Internal Server Error");
                      }
                    });
                }
              }}
              className="absolute top-0 bottom-0 left-0 right-0 block w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <section className="flex flex-col gap-6">
            <input
              id="title"
              placeholder={text?.title}
              type="text"
              {...register("title", { required: "Title is required" })}
              className="bg-input p-2 px-3 outline-none focus:outline-primary rounded-lg w-full sm:w-[70%]"
            />
            {errors.title?.message && (
              <p className="w-full text-sm text-red">{errors.title?.message}</p>
            )}
            <input
              id="year"
              placeholder={text?.year}
              type="number"
              {...register("year", {
                required: true,
                min: {
                  value: 1888,
                  message: "First ever movie was released in 1888",
                },
                max: {
                  value: new Date().getUTCFullYear() + 25,
                  message: `Release Year cannot be greater than ${
                    new Date().getUTCFullYear() + 25
                  }`,
                },
              })}
              className="remove-arrow bg-input p-2 px-3 outline-none focus:outline-primary rounded-lg w-full sm:w-[50%]"
            />
            {errors.year?.message && (
              <p className="w-full text-sm text-red">{errors.year?.message}</p>
            )}
            {error && <p className="w-full text-sm text-red">{error}</p>}
            <div className="flex mt-6 gap-6 w-[70%]">
              <button
                className="flex-1 bg-card border-2 border-white rounded-lg cursor-pointer hover:bg-opacity-20"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/${params.lang}/movies`);
                }}
              >
                {text?.cancel}
              </button>
              <button
                className="flex-1 py-3 rounded-lg cursor-pointer bg-primary hover:bg-opacity-20"
                type="submit"
              >
                {text?.update}
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
