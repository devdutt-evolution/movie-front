"use client";

import { RedirectType, redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) redirect("/login", RedirectType.replace);
    else redirect("/movies");
  });

  return <></>;
}
