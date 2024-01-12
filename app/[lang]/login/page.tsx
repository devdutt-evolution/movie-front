"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import type { Content, Local } from "@/i18n.config";
import { getDictionaries } from "@/lib/dictionaries";

type FormBody = {
  email: string;
  password: string;
  remember: boolean;
};

export default function Login({ params }: { params: { lang: Local } }) {
  const [text, setText] = useState<Content>();
  const router = useRouter();
  let ref = useRef<any>();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState } = useForm<FormBody>();
  const { errors } = formState;

  useEffect(() => {
    ref.current = setTimeout(() => {
      setError("");
    }, 2000);
  }, [error]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) router.push(`/${params.lang}/movies`);
    getDictionaries(params.lang).then((data) => setText(data));
  }, [router, params]);

  const submitForm: SubmitHandler<FormBody> = async (body) => {
    try {
      let result = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/signin`,
        {
          email: body.email,
          password: body.password,
        }
      );
      localStorage.setItem("token", result.data.token);
      router.push(`/${params.lang}/movies`);
    } catch (err: any) {
      if (
        err.name == "AxiosError" &&
        (err.response.status == 401 || err.response.status == 400)
      )
        setError(err.response.data.message);
    }
  };

  return (
    <div className="flex w-[min(1440px, 100vw)] min-h-screen justify-center items-center relative">
      <form
        className="flex flex-col items-center justify-center w-full sm:w-[332px] px-4"
        onSubmit={handleSubmit(submitForm)}
        noValidate
      >
        <h2 className="text-[64px]">{text?.login.singin}</h2>
        <input
          type="text"
          placeholder={text?.login.email}
          autoComplete="off"
          className={`w-full mt-6 p-2 px-3 rounded-lg outline-none bg-input ${
            errors.email?.message
              ? "focus:outline-red"
              : "focus:outline-primary"
          }`}
          id="email"
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email?.message && (
          <p className="w-full pt-1 text-sm text-left text-red">
            {errors.email?.message}
          </p>
        )}
        <input
          type="password"
          placeholder={text?.login.password}
          className={`w-full p-2 mt-6 px-3 rounded-lg outline-none bg-input ${
            errors.password?.message
              ? "focus:outline-red"
              : "focus:outline-primary"
          }`}
          id="password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password?.message && (
          <p className="w-full pt-1 text-sm text-left text-red">
            {errors.password?.message}
          </p>
        )}
        <label
          htmlFor="remember"
          className="flex items-start justify-center w-full p-0 mt-6"
        >
          <input
            type="checkbox"
            id="remember"
            className="accent-primary mr-2 w-[18px] h-[18px]"
            {...register("remember")}
          />
          <span className="leading-tight text-md">{text?.login.remember}</span>
        </label>
        {error && (
          <p className="w-full pt-1 mt-4 text-sm text-left text-red">{error}</p>
        )}
        <button
          className="w-full p-2 mt-6 rounded-lg bg-primary hover:bg-opacity-80"
          type="submit"
          id="submit"
        >
          {text?.login.login}
        </button>
      </form>
    </div>
  );
}