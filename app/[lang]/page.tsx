"use client";

import { Local } from "@/i18n.config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home({ params }: { params: { lang: Local } }) {
  const router = useRouter();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) router.replace(`/${params.lang}/login`);
    else router.replace(`/${params.lang}/login`);
  });

  return <></>;
}
