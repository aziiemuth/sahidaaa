"use client";

import dynamic from "next/dynamic";

const BirthdayApp = dynamic(() => import("@/components/BirthdayApp"), {
  ssr: false,
});

export default function Home() {
  return <BirthdayApp />;
}
