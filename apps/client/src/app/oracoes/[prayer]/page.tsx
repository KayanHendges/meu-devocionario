"use client";
import { useParams } from "next/navigation";

export default function Page() {
  const { prayer } = useParams();

  return <div>{decodeURI(prayer)}</div>;
}
