"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) router.replace("/en/login");
    else router.replace("/en/login");
  });

  return <></>;
}
