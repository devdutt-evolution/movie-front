"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormBody = {
  email: string;
  password: string;
  remember: boolean;
};

export default function Login() {
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
    if (token) router.push("/movies");
  }, [router]);

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
      router.push("/movies");
    } catch (err: any) {
      if (
        (err.name == "AxiosError" && err.response.status == 401) ||
        err.response.status == 400
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
        <h2 className="text-[64px]">Sign in</h2>
        <input
          type="text"
          placeholder="Email"
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
          <p className="w-full pt-1 text-left text-sm text-red">
            {errors.email?.message}
          </p>
        )}
        <input
          type="password"
          placeholder="Password"
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
          <p className="w-full pt-1 text-left text-sm text-red">
            {errors.password?.message}
          </p>
        )}
        <label
          htmlFor="remember"
          className="flex mt-6 items-start justify-center w-full p-0"
        >
          <input
            type="checkbox"
            id="remember"
            className="accent-primary mr-2 w-[18px] h-[18px]"
            {...register("remember")}
          />
          <span className="leading-tight text-md">Remember me</span>
        </label>
        {error && (
          <p className="w-full pt-1 mt-4 text-left text-sm text-red">{error}</p>
        )}
        <button
          className="w-full mt-6 p-2 rounded-lg bg-primary hover:bg-opacity-80"
          type="submit"
          id="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
