"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) router.push("/login");
    else router.push("/movies");
  });

  return <></>;
}
